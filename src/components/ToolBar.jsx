"use client";
import React from "react";
import Link from "next/link";

import {
  BsCheckSquare,
  BsSortAlphaDown,
  BsSortNumericDownAlt,
  BsDownload,
  BsTrash3,
} from "react-icons/bs";

const format = "mx-1 active:opacity-70 hover:text-sm-orange cursor-pointer";
const ToolBar = () => {
  return (
    <div className="flex justify-between text-black font-poppins items-end pb-3 ease-in-out transition-transform">
      <p className="font-bold text-xl m-0 p-0">All Speeches</p>
      <div className="text-xl flex items-center">
        <BsTrash3 className={`${format}`} />
        <BsDownload className={`${format}`} />
        <BsCheckSquare className={`${format}`} />
        <BsSortAlphaDown className={`${format} text-xl`} />
        <BsSortNumericDownAlt className={`${format} text-xl`} />
        <Link
          href="/live"
          className=" hover:scale-110 active:opacity-70 ml-2 no-underline text-white bg-sm-blue ease-in-out transition-transform text-lg font-semibold rounded-full h-fit px-3.5 pb-0.5 text-center"
        >
          + new
        </Link>
      </div>
    </div>
  );
};

export default ToolBar;
