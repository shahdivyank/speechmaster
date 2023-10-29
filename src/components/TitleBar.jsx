"use client";
import React from "react";
import Image from "next/image";
import logo from "../../public/logo.svg";
import Link from "next/link";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const { data: session } = useSession();
  return (
    <div className="bg-sm-white justify-between flex px-3 py-2">
      <Link
        href="/dashboard"
        className="scale-95 hover:opacity-80 active:opacity-60 transition-transform"
      >
        <Image src={logo} />
      </Link>
      <div className="flex items-center">
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
    </div>
  );
};

export default NavBar;
