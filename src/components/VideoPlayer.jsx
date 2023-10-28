"use client";
import { AdvancedVideo } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const VideoPlayer = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
  });

  const myVideo = cld.video("ot45g9k1znimvsym3wjg");
  return (
    <div>
      <AdvancedVideo cldVid={myVideo} controls />
    </div>
  );
};

export default VideoPlayer;
