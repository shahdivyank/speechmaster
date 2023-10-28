"use client";
import React from "react";
import Image from "next/image";
import logo from "../../public/logo.svg";
import { BsFileText } from "react-icons/bs";

const NavBar = ({ name, email, categories, image }) => {
  return (
    <div className="w-1/4 bg-sm-white flex flex-col justify-between p-4 font-poppins">
      <div>
        <div className="flex items-center mb-4">
          <div>
            <Image
              width="40"
              className=" aspect-square rounded-full mr-2"
              src={image}
              alt="profile photo"
            />
          </div>
          <div>
            <p className="m-0 text-lg font-extrabold">{name}</p>
            <p className="-mt-1 mb-0">{email}</p>
          </div>
        </div>
        <textarea
          className=" resize-none px-3 pt-1 h-7 w-full bg-sm-lightgrey text-sm-grey rounded text-xs"
          placeholder="search"
        />
        <div className="my-3 flex items-center">
          <div className="w-1.5 rounded-full bg-sm-orange h-8" />
          <div className=" cursor-pointer font-bold flex items-center bg-gray-100 w-full ml-2 py-1 rounded">
            <BsFileText className="text-xl mr-2" />
            All Speeches
          </div>
        </div>

        {categories.map((category, index) => (
          <div
            key={index}
            className="hover:bg-gray-100 rounded-sm active:bg-gray-100 transition-transform flex items-center px-3 py-1 cursor-pointer"
          >
            <div
              className={`mx-2 rounded-full w-2.5 h-2.5 ${
                index % 3 === 0
                  ? "bg-sm-blue"
                  : index % 2 === 0
                  ? "bg-sm-orange"
                  : "bg-sm-red"
              }`}
            />
            {category}
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center mb-3">
        <Image src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default NavBar;
