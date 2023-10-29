import cloudinary from "cloudinary";
import { NextResponse } from "next/server";
import prisma from "../../../../prismaClient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function GET(req) {
  const res = NextResponse;
  const videoId = req.nextUrl.searchParams.get("videoId");
  if (videoId) {
    const response = await prisma.videos.findUnique({
      where: {
        identifier: videoId,
      },
    });
    if (response) return res.json(response);
    else return res.json(500);
  } else {
    const session = await getServerSession(authOptions);
    const response = await prisma.videos.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: [
        {
          created: "desc",
        },
      ],
    });
    if (response) return res.json(response);
    else return res.json(500);
  }
}
