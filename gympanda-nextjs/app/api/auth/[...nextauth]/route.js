import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { authenticateUser } from "../../../../db/db"; // Adjust the path accordingly

export const authOptions = {
  providers: [
    // Credentials provider for username/password login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Make sure email and password are provided
        if (!credentials.email || !credentials.password) {
          throw new Error("Missing email or password");
        }

        // Authenticate user with provided credentials (database or other service)
        const user = await authenticateUser(credentials.email, credentials.password);

        // If user is not found or authentication fails, return null
        if (!user) {
          throw new Error("Invalid email or password");
        }

        // If user is authenticated successfully, return the user object
        return user;
      }
    }),

    // Google OAuth provider (for Google login)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],

  callbacks: {
    // Called when a JWT is created or updated
    async jwt({ token, user }) {
      // If user object is available (during login), add user info to the JWT
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name || ""; // Set the user's name, if available
      }
      return token;
    },

    // Called when a session is created or updated
    async session({ session, token }) {
      // Map token info to session's user object
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    }
  },

  pages: {
    // Redirect to this page if user is not authenticated
    signIn: "/auth/signin"
  },

  session: {
    strategy: "jwt", // Using JWT for session management
  },

  debug: process.env.NODE_ENV === "development", // Enable debug logs in development
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };