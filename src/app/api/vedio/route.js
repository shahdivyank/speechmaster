import cloudinary from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const res = NextResponse;
  const { file } = await req.json();

  cloudinary.v2.uploader
    .upload(file, { resource_type: "video" })
    .then((response) => {
      console.log("response", response);
      return res.json(response);
    })
    .catch((error) => {
      console.log("error", error);
      return res.json(error);
    });
}

export async function GET(req) {
  const res = NextResponse;
  const { file } = await req.json();

  cloudinary.v2.uploader
    .upload(file, { resource_type: "video" })
    .then((response) => {
      console.log("response", response);
      return res.json(response);
    })
    .catch((error) => {
      console.log("error", error);
      return res.json(error);
    });
}
