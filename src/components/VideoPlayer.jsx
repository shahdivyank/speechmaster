"use client";
import { BsPlayCircle, BsStopCircle } from "react-icons/bs";
import { Cloudinary } from "@cloudinary/url-gen";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { BiSolidMap } from "react-icons/bi";

const VideoPlayer = ({
  videoCreated,
  videoId,
  controls,
  timeLine,
  tags,
  setSelectedTag,
}) => {
  const [toggle, setToggle] = useState(false);
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
  });
  const [value, setValue] = useState(0);
  const videoRef = useRef(null);
  const myVideo = cld.video(videoId);
  // console.log(myVideo);
  useEffect(() => {
    videoRef.current.currentTime = 1000000;
  }, []);

  return (
    <div className="w-full">
      <video
        className="w-full max-h-[70vh]"
        src={myVideo.toURL()}
        ref={videoRef}
        controls={controls}
        onTimeUpdate={() => {
          console.log(
            (videoRef.current.currentTime * 100) / videoRef.current.duration,
          );
          setValue(
            (videoRef.current.currentTime * 100) / videoRef.current.duration,
          );
        }}
      />

      {timeLine &&
        (toggle ? (
          <BsStopCircle
            className="text-sm-red text-5xl cursor-pointer"
            onClick={() => {
              videoRef.current.pause();
              setToggle(false);
            }}
          />
        ) : (
          <BsPlayCircle
            className="cursor-pointer text-5xl"
            onClick={() => {
              videoRef.current.play();
              setToggle(true);
            }}
          />
        ))}
      <div className="relative w-full">
        {timeLine &&
          videoRef.current &&
          tags.map((tag, index) => {
            const pos = `${parseInt(
              (tag.time / videoRef.current.duration) * 100,
            )}`;
            return (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: `${pos}` + "%",
                }}
                key={index}
                onClick={() => {
                  setSelectedTag(tag);
                  setValue(tag.time);
                  videoRef.current.currentTime = tag.time;
                }}
              >
                <BiSolidMap
                  className={tag.color + " hover:cursor-pointer"}
                  size={30}
                />
              </div>
            );
          })}
      </div>
      {timeLine && (
        <input
          className="accent-sm-blue w-full"
          type="range"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (isFinite(videoRef.current?.duration))
              videoRef.current.currentTime =
                (e.target.value / 100) * videoRef.current?.duration;
            console.log(e.target.value);
            console.log(
              "set vlue",
              (e.target.value * videoRef.current?.duration) / 100.0,
            );
          }}
          max={100}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
