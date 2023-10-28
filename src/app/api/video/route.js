import cloudinary from "cloudinary";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const prisma = new PrismaClient();
  const res = NextResponse;
  const { file, title, categories } = await req.json();
  const video = await cloudinary.v2.uploader.upload(file, {
    resource_type: "video",
  });
  console.log(title);
  const snapshot = await prisma.videos.create({
    data: {
      identifier: video.public_id,
      userId: session.user.id,
      created: new Date(),
      score: 0,
      title: title,
      categories: categories.join(","),
    },
  });
  if (snapshot) res.json(snapshot);
  else res.json(500);
}

export async function GET() {
  const res = NextResponse;
  const session = await getServerSession(authOptions);
  const prisma = new PrismaClient();
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
