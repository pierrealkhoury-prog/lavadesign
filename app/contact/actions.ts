"use server";

import { prisma } from "@/lib/db";
import { sendInquiryNotification } from "@/lib/email";
import { isDisciplineSlug } from "@/lib/projects";

export type InquiryFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitInquiry(
  _prev: InquiryFormState,
  formData: FormData,
): Promise<InquiryFormState> {
  const name = (formData.get("name") ?? "").toString().trim();
  const email = (formData.get("email") ?? "").toString().trim();
  const message = (formData.get("message") ?? "").toString().trim();
  const disciplineRaw = (formData.get("discipline") ?? "").toString().trim();

  const fieldErrors: NonNullable<InquiryFormState["fieldErrors"]> = {};
  if (!name) fieldErrors.name = "Please tell us your name.";
  else if (name.length > 200) fieldErrors.name = "Name is too long.";

  if (!email) fieldErrors.email = "Please share an email.";
  else if (!EMAIL_RE.test(email))
    fieldErrors.email = "That email looks malformed.";
  else if (email.length > 200) fieldErrors.email = "Email is too long.";

  if (!message) fieldErrors.message = "Tell us a little about the project.";
  else if (message.length > 5000)
    fieldErrors.message = "Message is too long (5000 char max).";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  const discipline =
    disciplineRaw && isDisciplineSlug(disciplineRaw) ? disciplineRaw : null;

  try {
    await prisma.inquiry.create({
      data: { name, email, message, discipline },
    });
  } catch (error) {
    console.error("[contact] failed to persist inquiry", error);
    return {
      status: "error",
      message:
        "We couldn't record your inquiry. Try again, or email hello@lavadesign.us directly.",
    };
  }

  // Email send is stubbed for Phase 1 — see lib/email.ts.
  await sendInquiryNotification({ name, email, message, discipline });

  return {
    status: "success",
    message: "Thanks — we'll be in touch within two working days.",
  };
}
