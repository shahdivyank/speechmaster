"use client";
import { BsPlayCircle, BsStopCircle } from "react-icons/bs";
import { useState } from "react";

const Audience = () => {
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
      </div>

      <div className="w-1/5 m-4 bg-sm-white p-3 rounded"></div>
    </div>
  );
};

export default Audience;
