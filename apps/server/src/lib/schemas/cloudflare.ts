import { Type, type Static } from "typebox";

export const ConnectionSchema = Type.Object({
  accessToken: Type.String({ minLength: 1 }),
  externalAccountId: Type.String({ minLength: 1 }),
});

export type ConnectionRequestBody = Static<typeof ConnectionSchema>;
