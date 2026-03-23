import fastifyCors from "@fastify/cors";
import fastifySensible from "@fastify/sensible";
import Fastify from "fastify";

import { betterAuthHandler } from "@/lib/auth/handler";
import integrationRoutes from "@/routes/integrations";

const app = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss",
        ignore: "pid,hostname",
      },
    },
  },
});

app.register(fastifyCors, {
  origin: process.env.CLIENT_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400,
});
app.register(fastifySensible);

app.route({ method: ["GET", "POST"], url: "/auth/*", handler: betterAuthHandler });
app.register(integrationRoutes, { prefix: "/integrations" });

const start = async () => {
  try {
    await app.listen({ port: 8000, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
