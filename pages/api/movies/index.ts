import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  
  try {
    await serverAuth(req);
    
    const { title, videoUrl } = req.body;
    
    const movie = await prismadb.movie.create({
      data: {
        title,
        videoUrl: `/videos/${videoUrl}`,
      }
    });
    
    return res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
}