import { NextResponse } from "next/server";
import prisma from "../../../../prismaClient";
import { POSTURES } from "@/data/Posture";

export async function GET(req) {
  const res = NextResponse;
  const videoId = req.nextUrl.searchParams.get("videoId");

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

  if (postures && humes)
    return res.json({
      postures: postures.map((posture) => {
        return { ...posture, type: POSTURES[posture.type], check: "postures" };
      }),
      humes: humes.map((posture) => {
        return { ...humes, check: "humes" };
      }),
    });
  else return res.json(500);
}
