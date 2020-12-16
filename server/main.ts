import fastify from "fastify";
import fastifyStatic from "fastify-static";
import path from "path";
import {
  PORT,
  BASE_PATH,
  SESSION_SECRET,
  FRONTEND_ORIGIN,
  FRONTEND_PATH,
} from "$server/utils/env";
import { sessionStore } from "$server/utils/prisma";
import app, { Options } from "$server/config/app";

const isDev = process.env.NODE_ENV !== "production";

fastify({ logger: isDev })
  .register(fastifyStatic, {
    root: path.resolve(__dirname, "static"),
    prefix: FRONTEND_PATH,
    extensions: ["html"],
  })
  .register(app, {
    basePath: BASE_PATH,
    allowOrigin: [FRONTEND_ORIGIN],
    sessionSecret: SESSION_SECRET,
    sessionStore: sessionStore as Options["sessionStore"],
  })
  .listen(PORT, "::");
