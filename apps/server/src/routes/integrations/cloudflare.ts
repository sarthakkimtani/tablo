import Cloudflare from "cloudflare";
import { FastifyInstance } from "fastify";

import { encrypt } from "@/lib/encryption";
import { ConnectionRequestBody, ConnectionSchema } from "@/lib/schemas/cloudflare";
import * as cloudflareService from "@/repositories/cloudflare";

export default async function cloudflareRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (req) => {
    const userId = req.auth.user.id;
    const integrationDetails = await cloudflareService.getIntegration(userId);
    if (integrationDetails) {
      return { status: "connected", accountId: integrationDetails.accountId };
    } else {
      return { status: "disconnected" };
    }
  });

  fastify.post<{ Body: ConnectionRequestBody }>(
    "/",
    { schema: { body: ConnectionSchema } },
    async (req) => {
      const { accessToken, externalAccountId } = req.body;

      const cf = new Cloudflare({ apiToken: accessToken });
      const account = await cf.accounts.get({ account_id: externalAccountId });
      const encryptedToken = encrypt(accessToken);

      await cloudflareService.addIntegration({
        externalAccountId,
        accessToken: encryptedToken,
        userId: req.auth.user.id,
        provider: "cloudflare",
        metadata: {
          name: account.name,
        },
      });

      return { success: true };
    },
  );

  fastify.get("/workers", async (req) => {
    const userId = req.auth.user.id;
    const { token, id } = await cloudflareService.getToken(userId);
    if (!id) {
      return fastify.httpErrors.internalServerError();
    }

    const cf = new Cloudflare({ apiToken: token });
    const workers = await cf.workers.scripts.list({ account_id: id });

    return { success: true, data: workers.result };
  });

  fastify.get("/pages", async (req) => {
    const userId = req.auth.user.id;
    const { token, id } = await cloudflareService.getToken(userId);
    if (!id) {
      return fastify.httpErrors.internalServerError();
    }

    const cf = new Cloudflare({ apiToken: token });
    const pages = await cf.pages.projects.list({ account_id: id });

    return { success: true, data: pages.result };
  });

  fastify.delete("/", async (req) => {
    const userId = req.auth.user.id;

    await cloudflareService.deleteIntegration(userId);
    return { success: true };
  });
}
