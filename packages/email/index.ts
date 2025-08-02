import React from "react";
import { sendViaNodemailer } from "./providers/nodemailer";
import { sendViaResend } from "./providers/resend";
import {
  EmailOptionsSchema,
  type EmailOptions,
  type EmailResult,
} from "./types";

export type { EmailOptions, EmailResult } from "./types";

async function sendEmailWithProvider(
  options: EmailOptions
): Promise<EmailResult> {
  const validatedOptions = EmailOptionsSchema.parse(options);

  if (process.env.EMAIL_API_KEY) {
    return sendViaResend(validatedOptions);
  } else {
    return sendViaNodemailer(validatedOptions);
  }
}

export async function sendEmail(options: {
  react: React.ReactElement;
  to: string | string[];
  subject: string;
  from?: string;
}): Promise<EmailResult> {
  try {
    return sendEmailWithProvider({
      to: options.to,
      subject: options.subject,
      from: options.from,
      template: options.react,
    });
  } catch (error: any) {
    return {
      success: false,
      message: `Failed to send email: ${error.message}`,
    };
  }
}
