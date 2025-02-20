import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Replace with your real database check
        if (credentials.email === "test@example.com" && credentials.password === "password123") {
          return { id: "1", name: "John Doe", email: "test@example.com" };
        }
        return null; // Authentication failed
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
