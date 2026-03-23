import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { integration } from "@/lib/db/schema";
import { decrypt } from "@/lib/encryption";

export const getCloudflareToken = async (userId: string) => {
  const [row] = await db
    .select({ token: integration.accessToken })
    .from(integration)
    .where(and(eq(integration.userId, userId), eq(integration.provider, "cloudflare")))
    .limit(1);

  return decrypt(row.token);
};

export const addCFIntegration = async (data: typeof integration.$inferInsert) => {
  await db.insert(integration).values(data);
};

export const deleteCFIntegration = async (userId: string) => {
  await db
    .delete(integration)
    .where(and(eq(integration.userId, userId), eq(integration.provider, "cloudflare")));
};
