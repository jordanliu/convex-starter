import { auth } from "@repo/backend/better-auth/server";
import { httpRouter } from "convex/server";
import { betterAuthComponent } from "./auth";

const http = httpRouter();

betterAuthComponent.registerRoutes(http, auth);

export default http;
