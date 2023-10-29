"use client";
import Image from "next/image";
import divider from "../../public/divider.svg";
import logo from "../../public/logo2.svg";
import { BsGoogle } from "react-icons/bs";
import { signIn } from "next-auth/react";
const login = () => {
  return (
    <div className="flex font-poppins justify-center items-center w-full h-screen bg-gradient-to-br from-sm-orange via-sm-red to-sm-blue">
      <div className="w-1/2 flex h-2/3">
        <div className="w-1/2 flex justify-center items-center opacity-90 bg-sm-beige h-full rounded-l-lg">
          <Image className="opcaity-80" src={logo} />
        </div>

        <div className="w-1/2 p-6 bg-sm-white flex flex-col items-center h-full justify-center rounded-r-lg">
          <p className="p-0 text-4xl text-stone-700 font-semibold mb-3">
            LOGIN
          </p>
          <p className="p-0 text-sm -mt-3">WELCOME</p>
          <Image src={divider} />

          <div
            onClick={() => signIn("google")}
            className="hover:bg-sm-orange transition-transform hover:text-sm-white hover:opacity-50 border-[1px] border-stone-700 text-stone-700 text-xs py-1.5 px-8 mt-16 cursor-pointer flex items-center"
          >
            <BsGoogle className="mx-2" /> LOGIN WITH GOOGLE
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
