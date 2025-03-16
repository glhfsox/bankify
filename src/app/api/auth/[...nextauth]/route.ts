import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Don't export authOptions here - it should be in auth.config.ts
const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
