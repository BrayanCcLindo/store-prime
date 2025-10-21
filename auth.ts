import NextAuth, { NextAuthConfig, User, Session } from "next-auth";
import { prisma } from "./db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import { JWT } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const config = {
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-in"
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials == null) return null;
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string
          }
        });
        if (user && user?.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );
          if (isMatch) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role
            };
          }
        }
        return null;
      }
    })
  ],
  callbacks: {
    async session({
      session,
      user,
      trigger,
      token
    }: {
      session: Session;
      user: User;
      trigger?: "signIn" | "signUp" | "update";
      token: JWT;
    }) {
      if (session.user) {
        session.user.id = token.sub;
        // @ts-expect-error: role is a custom property added to the user
        session.user.role = token.role;
        session.user.name = token.name;
        if (trigger === "update") {
          session.user.name = user.name;
          // session.user.role = token.role;
          // session.user.name = token.name;
        }
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        // @ts-expect-error: role is a custom property added to the user
        token.role = user.role;
        if (user.name === "NO_NAME") {
          token.name = user.email!.split("@")[0];
          await prisma.user.update({
            where: {
              id: user.id as string
            },
            data: {
              name: token.name
            }
          });
          user.name = token.name;
        }
      }
      return token;
    },
    authorized({ request, auth }) {
      if (!request.cookies.get("sessionIdCart")) {
        const sessionIdCart = crypto.randomUUID();
        const newRequestHeaders = new Headers(request.headers);
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders
          }
        });
        response.cookies.set("sessionIdCart", sessionIdCart);
        return response;
      } else {
        return true;
      }
    }
  }
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
