// Email sending — currently stubbed.
//
// TODO(phase-1): wire to Resend once RESEND_API_KEY is provisioned.
// Replace the body of sendInquiryNotification() with something like:
//
//   import { Resend } from "resend";
//   const resend = new Resend(process.env.RESEND_API_KEY);
//   await resend.emails.send({
//     from: process.env.RESEND_FROM_EMAIL ?? "Lava <hello@lavadesign.us>",
//     to: process.env.INQUIRY_NOTIFICATION_EMAIL ?? "hello@lavadesign.us",
//     reply_to: payload.email,
//     subject: `New inquiry — ${payload.name}`,
//     text: renderInquiryEmail(payload),
//   });
//
// The signature here is already shaped for that swap; the rest of the app
// (the contact server action) only knows about sendInquiryNotification().

export type InquiryEmailPayload = {
  name: string;
  email: string;
  message: string;
  discipline: string | null;
};

export type SendResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

export async function sendInquiryNotification(
  payload: InquiryEmailPayload,
): Promise<SendResult> {
  // STUB: log the payload so we can see submissions land in `next dev` output.
  // No external network call until Resend is wired up.
  console.info("[email:stub] inquiry notification", {
    to: process.env.INQUIRY_NOTIFICATION_EMAIL ?? "hello@lavadesign.us",
    from: payload.email,
    name: payload.name,
    discipline: payload.discipline,
    preview: payload.message.slice(0, 160),
  });
  return { ok: true, id: `stub_${Date.now().toString(36)}` };
}
