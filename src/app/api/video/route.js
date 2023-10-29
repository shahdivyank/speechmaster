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
  return res.json(snapshot);
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

export async function PUT(req) {
  const res = NextResponse;
  const { title, videoId, action } = await req.json();
  const prisma = new PrismaClient();
  if (action === "delete") {
    const snapShot = await prisma.videos.deleteMany({
      where: {
        identifier: {
          in: videoId,
        },
      },
    });
    if (snapShot) return res.json(snapShot);
    else return res.json(500);
  } else {
    const snapShot = await prisma.videos.update({
      where: {
        videoId: videoId,
      },
      data: {
        title: title,
      },
    });
    if (snapShot) return res.json(snapShot);
    else return res.json(500);
  }
}
