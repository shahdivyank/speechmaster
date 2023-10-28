import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const res = NextResponse;
  const { recordedVideo } = await req.json();
  axios
    .post("https://www.googleapis.com/upload/youtube/v3/videos", {
      key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
      file: recordedVideo,
    })
    .then((response) => {
      return res.json(
        { message: `Authentication Error: ${message}` },
        { status: auth },
      );
    })
    .catch((error) => {
      console.log(error);
    });
}
