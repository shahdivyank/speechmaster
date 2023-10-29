import { NextResponse } from "next/server";
import prisma from "../../../../prismaClient";

export async function POST(req) {
  const res = NextResponse;
  const { humes, videoId } = await req.json();

  humes.forEach(async (hume) => {
    await prisma.hume.create({
      data: {
        ...hume,
        videoId: videoId,
      },
    });
  });
  return res.json(200);
}

export async function GET(req) {
  const res = NextResponse;
  const videoId = req.nextUrl.searchParams.get("videoId");
  const response = await prisma.hume.findMany({
    where: {
      videoId: videoId,
    },
    orderBy: [
      {
        timeStamp: "desc",
      },
    ],
  });
  if (response) return res.json(response);
  else return res.json(500);
}
