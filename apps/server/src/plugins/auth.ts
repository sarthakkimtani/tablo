import { fromNodeHeaders } from "better-auth/node";
import { FastifyReply, FastifyRequest } from "fastify";

import { auth } from "@/lib/auth";

export const requireAuth = async (request: FastifyRequest, reply: FastifyReply) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(request.headers),
  });

  if (!session) {
    return reply.code(401).send({ error: "Unauthorized" });
  }

  request.auth = session;
};
