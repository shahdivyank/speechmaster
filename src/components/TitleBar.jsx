"use client";
import React from "react";
import Link from "next/link";

import {
  BsCheckSquare,
  BsSortDownAlt,
  BsSortAlphaDown,
  BsSortNumericDownAlt,
} from "react-icons/bs";

const TitleBar = () => {
  return (
    <div className="w-3/4 flex justify-between text-black font-poppins items-end p-3">
      <p className="font-bold text-xl m-0 p-0">All Speeches</p>
      <div className="text-xl flex items-center">
        <BsCheckSquare className="mx-1 active:opacity-70 hover:text-sm-orange cursor-pointer" />
        <BsSortAlphaDown className="text-xl mx-1 active:opacity-70 hover:text-sm-orange cursor-pointer" />
        <BsSortNumericDownAlt className="text-xl active:opacity-70 hover:text-sm-orange cursor-pointer" />
        <Link
          href="/live"
          className=" hover:scale-110 active:opacity-70 mx-1 no-underline text-white bg-sm-blue text-lg font-semibold rounded-full h-fit px-3.5 pb-0.5 text-center"
        >
          + new
        </Link>
      </div>
    </div>
  );
};

export default TitleBar;
