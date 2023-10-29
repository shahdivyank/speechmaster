import { NextResponse } from "next/server";
import prisma from "../../../../prismaClient";

export async function POST(req) {
  const res = NextResponse;
  const { timeStamp, message, type, videoId } = await req.json();

  const snapshot = await prisma.hume.create({
    data: {
      videoId: videoId,
      timeStamp: timeStamp,
      message: message,
      type: type.join(","),
    },
  });
  return res.json(snapshot);
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
