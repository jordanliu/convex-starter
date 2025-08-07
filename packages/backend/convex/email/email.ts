import { type RunMutationCtx } from "@convex-dev/better-auth";
import { Resend } from "@convex-dev/resend";
import { render } from "@react-email/components";
import { components } from "../_generated/api";

export const resend: Resend = new Resend(components.resend, {});

export const sendEmail = async (
  ctx: RunMutationCtx,
  {
    from,
    to,
    subject,
    react,
    cc,
    bcc,
    replyTo,
  }: {
    from?: string;
    to: string;
    subject: string;
    react: any;
    cc?: string[];
    bcc?: string[];
    replyTo?: string[];
  }
) => {
  const defaultFrom = "noreply@yourdomain.com";

  await resend.sendEmail(ctx, {
    from: from || defaultFrom,
    to,
    subject,
    html: await render(react),
    ...(cc && { cc }),
    ...(bcc && { bcc }),
    ...(replyTo && { replyTo }),
  });
};
