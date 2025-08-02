import { Resend } from "resend";

export const resend = process.env.EMAIL_API_KEY
  ? new Resend(process.env.EMAIL_API_KEY)
  : null;
