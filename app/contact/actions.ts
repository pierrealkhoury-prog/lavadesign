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

  // DB write and email notification run independently — the inquiry is
  // captured as long as ONE of them succeeds (durable record OR studio
  // notification). Both failing is treated as a real failure.
  let dbOk = false;
  try {
    await prisma.inquiry.create({
      data: { name, email, message, discipline },
    });
    dbOk = true;
  } catch (error) {
    console.error("[contact] failed to persist inquiry", error);
  }

  const emailResult = await sendInquiryNotification({
    name,
    email,
    message,
    discipline,
  });

  if (!dbOk && !emailResult.ok) {
    return {
      status: "error",
      message:
        "We couldn't process your inquiry. Please try again or email info@lavadesign.us directly.",
    };
  }

  return {
    status: "success",
    message: "Thanks — we'll be in touch within two working days.",
  };
}
