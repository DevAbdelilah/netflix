import Prismadb from "@/lib/prismadb";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
export default NextAuth({
  providers: [
    Credentials({
      id: "credentiels",
      name: "Credentiels",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentiels) {
        if (!credentiels?.email || !credentiels?.password) {
          throw new Error("Email and password required");
        }
        const user = await Prismadb.user.findUnique({
          where: {
            email: credentiels.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Email does not exist");
        }

        const isCorrectPassword = await compare(
          credentiels.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }
        return user;
      },
    }),
  ],

  pages: {
    signIn: "/Home",
  },
  debug: process.env.NODE_ENV === "development",

  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret:process.env.
});
