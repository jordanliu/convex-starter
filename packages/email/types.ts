import { z } from "zod";

const EmailAttachmentSchema = z.object({
  filename: z.string(),
  content: z.union([z.instanceof(Buffer), z.string()]),
  contentType: z.string().optional(),
});

export const EmailOptionsSchema = z.object({
  to: z.union([z.string().email(), z.array(z.string().email())]),
  from: z.string().email().optional(),
  subject: z.string().min(1),
  template: z.any(),
  attachments: z.array(EmailAttachmentSchema).optional(),
});

export type EmailOptions = z.infer<typeof EmailOptionsSchema>;

export type EmailResult = {
  success: boolean;
  messageId?: string;
  message?: string;
};
