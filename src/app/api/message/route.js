import { NextResponse } from "next/server";
import prisma from "../../../../prismaClient";

export async function POST(req) {
  const res = NextResponse;
  const { message, videoId } = await req.json();
  console.log(message);
  const response = await prisma.messages.create({
    data: {
      videoId: videoId,
      userImg: "img",
      message: message,
      timestamp: new Date(),
    },
  });

  return res.json(response);
}
