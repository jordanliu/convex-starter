import { httpRouter } from "convex/server";
import { auth } from "../better-auth/server";
import { betterAuthComponent } from "./auth";

const http = httpRouter();

betterAuthComponent.registerRoutes(http, auth);

export default http;
