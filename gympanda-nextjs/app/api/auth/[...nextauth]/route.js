import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser } from "../../../../db/db";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Missing email or password");
        }

        const user = await authenticateUser(credentials.email, credentials.password);

        if (!user) {
          throw new Error("Invalid email or password");
        }
        return user;
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],

  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    }
  },

  pages: {
    signIn: "/auth/signin"
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
