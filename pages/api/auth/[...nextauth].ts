import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    // Ensure the database is connected
    await prismadb.$connect();
    console.log("Database connected successfully");

    const { email, name, password } = req.body;
    console.log("Request body:", req.body);

    if (!email || !name || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingUser = await prismadb.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(422).json({ error: "Email taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Hashed password:", hashedPassword);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    console.log("User created:", user);
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(400).json({ error: "Something went wrong" });
  } finally {
    await prismadb.$disconnect();
  }
}
