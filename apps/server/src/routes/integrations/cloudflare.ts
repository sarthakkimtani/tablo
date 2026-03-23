import Cloudflare from "cloudflare";
import { FastifyInstance } from "fastify";

import { encrypt } from "@/lib/encryption";
import { ConnectionRequestBody, ConnectionSchema } from "@/lib/schemas/cloudflare";
import {
  addCFIntegration,
  deleteCFIntegration,
  getCloudflareToken,
} from "@/repositories/cloudflare";

export default async function cloudflareRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: ConnectionRequestBody }>(
    "/",
    { schema: { body: ConnectionSchema } },
    async (req) => {
      const { accessToken, externalAccountId } = req.body;

      const cf = new Cloudflare({ apiToken: accessToken });
      const account = await cf.accounts.get({ account_id: externalAccountId });
      const encryptedToken = encrypt(accessToken);

      await addCFIntegration({
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

    const apiToken = await getCloudflareToken(userId);
    const cf = new Cloudflare({ apiToken });
    return { success: true, data: cf.workers.scripts };
  });

  fastify.get("/pages", async (req) => {
    const userId = req.auth.user.id;

    const apiToken = await getCloudflareToken(userId);
    const cf = new Cloudflare({ apiToken });
    return { success: true, data: cf.pages.projects };
  });

  fastify.delete("/", async (req) => {
    const userId = req.auth.user.id;

    await deleteCFIntegration(userId);
    return { success: true };
  });
}
