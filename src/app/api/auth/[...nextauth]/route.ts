import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // In a real application, you'd check against your database
        const user = mockUsers.find(
          (user) =>
            user.email === credentials.email &&
            user.password === credentials.password
        );

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        }

        // For demo purposes, if no users match, still return a mock user
        // Remove this in a real application
        if (credentials.email && credentials.password) {
          return {
            id: "mock-id",
            name: "Demo User",
            email: credentials.email,
          };
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-google-client-secret",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "mock-facebook-client-id",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "mock-facebook-client-secret",
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID || "mock-apple-client-id",
      clientSecret: process.env.APPLE_CLIENT_SECRET || "mock-apple-client-secret",
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
