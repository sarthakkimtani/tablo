import { FastifyError, FastifyInstance } from "fastify";

export async function errorHandlerPlugin(fastify: FastifyInstance) {
  fastify.setErrorHandler((error: FastifyError, request, reply) => {
    request.log.error(error);

    if (error.validation) {
      return reply.status(400).send({
        error: "Validation error",
        details: error.validation,
      });
    }

    return reply.status(error.statusCode || 500).send({
      error: error.message || "Internal Server Error",
    });
  });
}
