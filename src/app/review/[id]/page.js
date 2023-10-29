"use client";
import { BsArrowRightShort } from "react-icons/bs";
import { breakdown } from "@/data/Breakdown";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "react-circular-progressbar/dist/styles.css";
import VideoPlayer from "@/components/VideoPlayer";
import { TAGS } from "@/data/mockTags";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const review = ({ params }) => {
  const value = 78;
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState({});
  console.log(video);
  useEffect(() => {
    axios.get(`/api/video?videoId=${params.id}`).then((res) => {
      setVideo(res.data);
      setTitle(res.data.title);
    });
  }, []);
  return (
    <div className="w-full flex justify-center bg-sm-beige h-[90vh]">
      <div className="w-8/12 flex flex-col">
        <div className="h-6 w-full flex my-3">
          <textarea
            className="px-2 resize-none rounded w-full"
            placeholder="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <div
            className="px-2.5 pt-0.5 text-sm-white bg-sm-red rounded text-xs hover:cursor-pointer"
            onClick={() => {
              axios
                .put("/api/video", {
                  title: title,
                  videoId: params.id,
                  action: "update",
                })
                .then((res) => {
                  toast("✅ successfully updated");
                });
            }}
          >
            save
          </div>
        </div>
        <VideoPlayer
          videoId={params.id}
          timeLine={true}
          controls={false}
          tags={TAGS}
        />
      </div>

      <div className="w-1/4 m-4 bg-sm-white p-3 rounded-xl">
        <div className="flex w-full items-center justify-between">
          <p className="font-bold text-xl">report</p>
          <p
            className="font-bold text-xl bg-sm-red rounded-md text-white hover:cursor-pointer px-2"
            onClick={() => {
              axios.post("/api/outline", { videoId: params.id }).then((res) => {
                console.log(res.data.url);
                const url = res.data.url;
                const a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                a.href = url;
                a.click();
                window.URL.revokeObjectURL(url);
              });
            }}
          >
            transcript
          </p>
        </div>
        <CircularProgressbar
          className="-mt-5 scale-75"
          counterClockwise={true}
          value={value}
          maxValue={100}
          text={value}
        />
        <p className="font-bold text-xl flex items-center justify-between cursor-pointer hover:text-sm-orange ease-in-out">
          breakdown <BsArrowRightShort />
        </p>
        <div className=" p-2 rounded-2xl bg-sm-lightbeige">
          {breakdown.map((item, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`mr-2 text-sm-white font-bold my-1 aspect-square ${
                  item.behavior === "comment" ? "bg-sm-blue" : "bg-sm-red"
                } w-6 text-center rounded`}
              >
                {item.count}
              </div>
              {item.behavior}
            </div>
          ))}
        </div>
        <p className="mt-1 font-bold text-xl flex items-center justify-between cursor-pointer hover:text-sm-orange ease-in-out">
          outline <BsArrowRightShort />
        </p>
        <div className=" p-2 rounded-2xl bg-sm-lightbeige"></div>
      </div>
    </div>
  );
};

export default review;
