"use client";
import { BsPlayCircle, BsStopCircle } from "react-icons/bs";
import { useState } from "react";
import { breakdown } from "@/data/Breakdown";

const review = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="w-full flex justify-center">
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
        <div className="w-full h-96 rounded-lg bg-sm-grey flex items-end justify-center p-3">
          {toggle ? (
            <BsStopCircle
              className="text-sm-red text-5xl cursor-pointer"
              onClick={() => setToggle(false)}
            />
          ) : (
            <BsPlayCircle
              className="cursor-pointer text-5xl"
              onClick={() => setToggle(true)}
            />
          )}
        </div>
        <div className=" h-4 rounded-full my-4 bg-gradient-to-r from-sm-orange via-sm-red to-sm-blue" />
      </div>

      <div className="w-1/5 m-4 bg-sm-white p-3 rounded-xl">
        <p className="font-bold text-xl">report</p>

        <p className="font-bold text-xl">breakdown</p>
        <div className=" p-2 rounded-2xl bg-sm-lightbeige">
          {breakdown.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="mr-2 text-sm-white font-bold my-1 aspect-square bg-sm-red w-6 text-center rounded">
                {" "}
                {item.count}
              </div>
              {item.behavior}
            </div>
          ))}
        </div>
        <p className="font-bold text-xl">outline</p>
        <div className=" p-2 rounded-2xl bg-sm-lightbeige">
          {breakdown.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="mr-2 text-sm-white font-bold my-1 aspect-square bg-sm-red w-6 text-center rounded">
                {" "}
                {item.count}
              </div>
              {item.behavior}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default review;
