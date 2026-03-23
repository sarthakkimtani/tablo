import "fastify";

import type { Session } from "@/lib/auth";

declare module "fastify" {
  interface FastifyRequest {
    auth: Session;
  }
}
