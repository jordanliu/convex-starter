import { RunMutationCtx } from "@convex-dev/better-auth";
import { Resend } from "@convex-dev/resend";
import { render } from "@react-email/components";
import { components } from "../_generated/api";
import "../polyfill";

export const resend: Resend = new Resend(components.resend, {
  testMode: true,
});

export const sendEmail = async (
  ctx: RunMutationCtx,
  {
    from,
    to, //TODO: change to user email
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
  const defaultFrom = "delivered@resend.dev";

  await resend.sendEmail(ctx, {
    from: from || defaultFrom,
    to: "delivered@resend.dev",
    subject,
    html: await render(react),
    ...(cc && { cc }),
    ...(bcc && { bcc }),
    ...(replyTo && { replyTo }),
  });
};
