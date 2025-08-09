import { convexAdapter } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { requireMutationCtx } from "@convex-dev/better-auth/utils";
import { betterAuth, BetterAuthOptions } from "better-auth";
import { organization } from "better-auth/plugins";
import { GenericCtx } from "../convex/_generated/server";
import { betterAuthComponent } from "../convex/auth";
import { sendEmail } from "../convex/email/email";
import VerifyEmail from "../convex/email/templates/verifyEmail";

const createOptions = (ctx: GenericCtx) =>
  ({
    baseURL: process.env.APP_URL as string,
    database: convexAdapter(ctx, betterAuthComponent),
    account: {
      accountLinking: {
        enabled: true,
        allowDifferentEmails: true,
      },
    },

    emailAndPassword: {
      enabled: true,
    },
    emailVerification: {
      sendVerificationEmail: async ({ user, url }) => {
        await sendEmail(requireMutationCtx(ctx), {
          to: user.email,
          subject: "Verify your email address",
          react: VerifyEmail({ name: user.name || "", verificationUrl: url }),
        });
      },
    },
    socialProviders: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      },
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        accessType: "offline",
        prompt: "select_account+consent",
      },
    },
    plugins: [organization()],
  }) satisfies BetterAuthOptions;

export const auth = (ctx: GenericCtx): ReturnType<typeof betterAuth> => {
  const options = createOptions(ctx);
  return betterAuth({
    ...options,
    plugins: [
      ...options.plugins,
      // Pass in options so plugin schema inference flows through. Only required
      // for plugins that customize the user or session schema.
      // See "Some caveats":
      // https://www.better-auth.com/docs/concepts/session-management#customizing-session-response
      convex({ options }),
    ],
  });
};
