import cloudinary from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const res = NextResponse;
  const { videoId } = await req.json();
  const transcript = await cloudinary.v2.api.resource(videoId + ".transcript", {
    resource_type: "raw",
  });
  console.log(transcript);
  return res.json(transcript);
}
