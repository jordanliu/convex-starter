import { render } from "@react-email/components";
import type { EmailOptions, EmailResult } from "../types";
import { resend } from "./resend/client";

export async function sendViaResend(
  options: EmailOptions
): Promise<EmailResult> {
  if (!resend) {
    return {
      success: false,
      message: "Resend client is not initialized",
    };
  }

  try {
    const html = await render(options.template);
    const result = await resend.emails.send({
      from: options.from || process.env.EMAIL_FROM || "noreply@example.com",
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html,
      attachments: options.attachments,
    });

    return {
      success: true,
      messageId: result.data?.id,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
