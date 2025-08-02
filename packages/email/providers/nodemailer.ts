import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import type { EmailOptions, EmailResult } from "../types";

export async function sendViaNodemailer(
  options: EmailOptions
): Promise<EmailResult> {
  const requiredEnvVars = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"];
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    return {
      success: false,
      message: `Missing required environment variables: ${missing.join(", ")}`,
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT!),
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
    });

    const html = await render(options.template);
    const result = await transporter.sendMail({
      from: options.from || process.env.EMAIL_FROM || "noreply@example.com",
      to: Array.isArray(options.to) ? options.to.join(", ") : options.to,
      subject: options.subject,
      html,
      attachments: options.attachments,
    });

    if (process.env.NODE_ENV === "development") {
      const previewUrl = nodemailer.getTestMessageUrl(result);
      if (previewUrl) {
        console.info(`📧 Email preview: ${previewUrl}`);
      }
    }

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
