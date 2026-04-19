import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { integration } from "@/lib/db/schema";
import { decrypt } from "@/lib/encryption";

export const getToken = async (userId: string) => {
  const [row] = await db
    .select({ token: integration.accessToken, id: integration.externalAccountId })
    .from(integration)
    .where(and(eq(integration.userId, userId), eq(integration.provider, "cloudflare")))
    .limit(1);

  return { token: decrypt(row.token), id: row.id };
};

export const getIntegration = async (userId: string) => {
  const [row] = await db
    .select({ accountId: integration.externalAccountId })
    .from(integration)
    .where(eq(integration.userId, userId));

  return row.accountId !== null ? { accountId: row.accountId } : null;
};

export const addIntegration = async (data: typeof integration.$inferInsert) => {
  await db.insert(integration).values(data);
};

export const deleteIntegration = async (userId: string) => {
  await db
    .delete(integration)
    .where(and(eq(integration.userId, userId), eq(integration.provider, "cloudflare")));
};
