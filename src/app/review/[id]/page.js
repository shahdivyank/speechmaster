"use client";
import { BsArrowRightShort } from "react-icons/bs";
import { breakdown } from "@/data/Breakdown";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "react-circular-progressbar/dist/styles.css";
import VideoPlayer from "@/components/VideoPlayer";

const review = ({ params }) => {
  const value = 78;
  return (
    <div className="w-full flex justify-center bg-sm-beige">
      <div className="w-8/12 flex flex-col min-h-screen">
        <div className="h-6 w-full flex my-3">
          <textarea
            className="px-2 resize-none rounded w-full"
            placeholder="title"
          />
          <div className="px-2.5 pt-0.5 text-sm-white bg-sm-red rounded text-xs">
            save
          </div>
        </div>
        <VideoPlayer videoId={params.id} timeLine={true} controls={false} />
      </div>

      <div className="w-1/4 m-4 bg-sm-white p-3 rounded-xl">
        <p className="font-bold text-xl">report</p>
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
