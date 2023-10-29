import { NextResponse } from "next/server";
import prisma from "../../../../prismaClient";
import { POSTURES } from "@/data/Posture";

export async function POST(req) {
  const res = NextResponse;
  const { postures, videoId } = await req.json();
  postures.forEach(async (posture) => {
    await prisma.posture.create({
      data: {
        ...posture,
        videoId: videoId,
        type: POSTURES[posture.type],
      },
    });
  });
  return res.json(200);
}

export async function GET(req) {
  const res = NextResponse;
  const videoId = req.nextUrl.searchParams.get("videoId");
  const response = await prisma.posture.findMany({
    where: {
      videoId: videoId,
    },
    orderBy: [
      {
        timestamp: "desc",
      },
    ],
  });
  if (response) return res.json(response);
  else return res.json(500);
}
