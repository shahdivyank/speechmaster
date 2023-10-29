import cloudinary from "cloudinary";
import { NextResponse } from "next/server";
import prisma from "../../../../prismaClient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { POSTURES } from "@/data/Posture";
import { EMOTIONS_NEG, EMOTIONS_POS } from "@/data/Emotions";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const res = NextResponse;
  const { file, title, categories, created, postures, humes, messages } =
    await req.json();
  const video = await cloudinary.v2.uploader.upload(file, {
    resource_type: "video",
  });
  const score = Math.abs(
    100 -
      2 * postures.length -
      2 *
        humes.filter((hume) => EMOTIONS_NEG.includes(hume.emotionName)).length +
      2 *
        humes.filter((hume) => EMOTIONS_POS.includes(hume.emotionName)).length,
  );

  await prisma.videos.create({
    data: {
      identifier: video.public_id,
      userId: session.user.id,
      created: created,
      score: score,
      title: title,
      categories: categories.join(","),
    },
  });

  postures.forEach(async (posture) => {
    await prisma.posture.create({
      data: {
        ...posture,
        videoId: video.public_id,
        type: POSTURES[posture.type],
      },
    });
  });
  humes.forEach(async (hume) => {
    await prisma.hume.create({
      data: {
        ...hume,
        videoId: video.public_id,
      },
    });
  });
  messages.forEach(async (message) => {
    await prisma.messages.create({
      data: {
        ...message,
        userImg: "img",
        videoId: video.public_id,
      },
    });
  });
  return res.json(200);
}

export async function GET(req) {
  const res = NextResponse;
  const videoId = req.nextUrl.searchParams.get("videoId");

  const response = await prisma.videos.findUnique({
    where: {
      identifier: videoId,
    },
  });
  const postures = await prisma.posture.findMany({
    where: {
      videoId: videoId,
    },
    orderBy: [
      {
        timestamp: "desc",
      },
    ],
  });
  const humes = await prisma.hume.findMany({
    where: {
      videoId: videoId,
    },
    orderBy: [
      {
        timestamp: "desc",
      },
    ],
  });
  const messages = await prisma.messages.findMany({
    where: {
      videoId: videoId,
    },
    orderBy: [
      {
        timestamp: "desc",
      },
    ],
  });
  return res.json({
    video: response,
    postures: postures.map((posture) => {
      return {
        ...posture,
        check: "postures",
        timestamp:
          Math.abs(new Date(posture.timestamp) - new Date(response.created)) /
          1000,
      };
    }),
    humes: humes.map((hume) => {
      return {
        ...hume,
        check: "humes",
        timestamp:
          Math.abs(new Date(hume.timestamp) - new Date(response.created)) /
          1000,
      };
    }),
    messages: messages.map((message) => {
      return {
        ...message,
        check: "messages",
        timestamp:
          Math.abs(new Date(message.timestamp) - new Date(response.created)) /
          1000,
      };
    }),
  });
}

export async function PUT(req) {
  const res = NextResponse;
  const { title, videoId, action } = await req.json();
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
        identifier: videoId,
      },
      data: {
        title: title,
      },
    });
    if (snapShot) return res.json(snapShot);
    else return res.json(500);
  }
}
