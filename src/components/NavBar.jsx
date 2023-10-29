"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../public/logo.svg";
import { BsFileText } from "react-icons/bs";
import { useSession } from "next-auth/react";

const NavBar = ({ categories, recordings, setRecordings }) => {
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const handleSearch = (e) => {
    e.preventDefault();
    setRecordings(
      recordings.map((recording) => {
        if (recording.title.toLowerCase().match(search.toLowerCase())) {
          recording.hidden = false;
        } else {
          recording.hidden = true;
        }
        return recording;
      }),
    );
  };

  const handleFilter = (category) => {
    setFilter(category);
    setRecordings(
      recordings.map((recording) => {
        if (recording.categories.includes(category)) {
          recording.hidden = false;
        } else {
          recording.hidden = true;
        }
        return recording;
      }),
    );
  };

  const handleReset = () => {
    setFilter("all");
    setRecordings(
      recordings.map((recording) => {
        recording.hidden = false;
        return recording;
      }),
    );
  };

  return (
    <div className="w-1/5 bg-sm-white flex flex-col justify-between p-4 font-poppins">
      <div>
        <div className="flex items-center mb-4">
          <div>
            <Image
              height="40"
              width="40"
              className=" aspect-square rounded-full mr-2"
              src={session.user.image}
              alt="profile photo"
            />
          </div>
          <div>
            <p className="m-0 text-lg font-extrabold">{session.user.name}</p>
            <p className="-mt-1 mb-0">{session.user.email}</p>
          </div>
        </div>
        <form onSubmit={handleSearch}>
          <input
            className="resize-none px-3 py-1 h-7 w-full bg-sm-lightgrey text-sm-grey rounded text-xs outline-none"
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <div className="my-3 flex items-center">
          {filter === "all" ? (
            <div className="w-1.5 rounded-full bg-sm-orange h-8" />
          ) : (
            <div className="w-1.5 bg-transparent" />
          )}
          <div
            className=" cursor-pointer font-bold flex items-center w-full px-2 py-1 hover:bg-gray-100 "
            onClick={handleReset}
          >
            <BsFileText className="text-xl mr-2" />
            All Speeches
          </div>
        </div>

        {categories.map((category, index) => (
          <div className="flex" key={index}>
            {filter === category ? (
              <div className="w-1.5 rounded-full bg-sm-orange h-8" />
            ) : (
              <div className="w-1.5 bg-transparent" />
            )}
            <div
              key={index}
              onClick={() => handleFilter(category)}
              className="hover:bg-gray-100 rounded-sm active:bg-gray-100 transition-transform flex items-center px-1 py-1 cursor-pointer w-full"
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
