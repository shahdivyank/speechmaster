"use client";
import { BsPlayCircle, BsStopCircle } from "react-icons/bs";
import { Cloudinary } from "@cloudinary/url-gen";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { BiSolidMap } from "react-icons/bi";
import { EMOTIONS_NEG } from "@/data/Emotions";

const VideoPlayer = ({
  videoId,
  controls,
  timeLine,
  humes,
  postures,
  setSelectedTag,
  messages,
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
            className="text-sm-red text-5xl cursor-pointer mb-5"
            onClick={() => {
              videoRef.current.pause();
              setToggle(false);
            }}
          />
        ) : (
          <BsPlayCircle
            className="cursor-pointer text-5xl mb-5"
            onClick={() => {
              videoRef.current.play();
              setToggle(true);
            }}
          />
        ))}
      <div className="relative w-full">
        {timeLine &&
          videoRef.current &&
          postures.map((posture, index) => {
            const pos = `${parseInt(
              (posture.timestamp / videoRef.current.duration) * 100,
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
                  setSelectedTag(posture);
                  setValue(posture.timestamp);
                  videoRef.current.currentTime = posture.timestamp;
                }}
              >
                <BiSolidMap
                  className="text-sm-red hover:cursor-pointer"
                  size={30}
                />
              </div>
            );
          })}
        {timeLine &&
          videoRef.current &&
          humes.map((hume, index) => {
            const pos = `${parseInt(
              (hume.timestamp / videoRef.current.duration) * 100,
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
                  setSelectedTag(hume);
                  setValue(hume.timestamp);
                  videoRef.current.currentTime = hume.timestamp;
                }}
              >
                <BiSolidMap
                  className={`hover:cursor-pointer ${
                    EMOTIONS_NEG.includes(hume.emotionName)
                      ? "text-sm-orange"
                      : "text-sm-blue"
                  }`}
                  size={30}
                />
              </div>
            );
          })}
        {timeLine &&
          videoRef.current &&
          messages.map((hume, index) => {
            const pos = `${parseInt(
              (hume.timestamp / videoRef.current.duration) * 100,
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
                  setSelectedTag(hume);
                  setValue(hume.timestamp);
                  videoRef.current.currentTime = hume.timestamp;
                }}
              >
                <BiSolidMap
                  className={`hover:cursor-pointer text-sm-blue
              `}
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
