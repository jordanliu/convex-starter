import { toNextJsHandler } from "better-auth/next-js";
import "server-only";

import { auth } from "./server";

export const { POST, GET } = toNextJsHandler(auth);
