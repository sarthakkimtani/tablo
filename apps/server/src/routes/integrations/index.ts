import { FastifyInstance } from "fastify";

import { requireAuth } from "@/plugins/auth";
import cloudflareRoutes from "@/routes/integrations/cloudflare";

export default async function integrationRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", requireAuth);
  fastify.register(cloudflareRoutes, { prefix: "/cloudflare" });
}
