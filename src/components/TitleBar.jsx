"use client";
import React from "react";
import Image from "next/image";
import logo from "../../public/logo.svg";
import { user } from "@/data/User";
import Link from "next/link";
const NavBar = () => {
  return (
    <div className="bg-sm-white justify-between flex px-3 py-2">
      <Link
        href="/"
        className="scale-95 hover:opacity-80 active:opacity-60 transition-transform"
      >
        <Image src={logo} />
      </Link>
      <div className="flex items-center">
        <div>
          <Image
            width="40"
            className=" aspect-square rounded-full mr-2"
            src={user.image}
            alt="profile photo"
          />
        </div>

        <div>
          <p className="m-0 text-lg font-extrabold">{user.name}</p>
          <p className="-mt-1 mb-0">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
