"use client";
import { AdvancedVideo } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const VideoPlayer = ({ videoId, controls }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
  });

  const myVideo = cld.video(videoId);
  return (
    <div>
      <AdvancedVideo cldVid={myVideo} controls={controls} />
    </div>
  );
};

export default VideoPlayer;
