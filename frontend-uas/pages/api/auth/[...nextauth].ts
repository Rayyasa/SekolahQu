import { axiosClient } from "@/lib/axiosClient"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials: any, req) {
        return {
          ...credentials
        }
      }
    }),

    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // })
  ],

  callbacks: {
    async jwt({ token, user, account, profile, trigger, session }) {
      if (trigger === 'update') {
        return { ...token, ...session.user }
      }
      return {
        ...token,
        ...user,
        ...account,
      }
    },
    async session({ session, token }) {
      session.user.id = Number(token.id);
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.role = token.role
      console.log(session);
      console.log(token);
      return session
    }
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/error",
  },
}



export default NextAuth(authOptions)