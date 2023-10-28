import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BsArrowRightShort } from "react-icons/bs";

const Recording = ({
  image,
  title = "new presentation",
  share,
  created,
  modified,
  format,
}) => {
  return (
    <div className={`w-full flex font-poppins p-3 ${format}`}>
      <input className="mr-4" type="checkbox" />
      <Image
        src={image}
        alt="profile photo"
        className=" aspect-square"
        width="70"
      />
      <div className="flex justify-between w-full">
        <div className="ml-2">
          <p className="m-0">{title}</p>
          {share && (
            <div className="text-xs flex">
              <p className="m-0 pr-2 text-sm-grey">audience</p>
              {share.map((img, index) => (
                <Image
                  width="20"
                  className=" aspect-square rounded-full"
                  src={img}
                  key={index}
                />
              ))}
              <p className="m-0 pl-2 font-bold">and others</p>
            </div>
          )}
        </div>
        <div>
          <div className="h-full flex flex-col justify-center items-end">
            <p className=" text-xs m-0 text-sm-grey">created: {created}</p>
            <p className="text-xs m-0 text-sm-grey">
              last modified: {modified}
            </p>
            <Link
              href="/review"
              className="hover:opacity-50 transition-transform ease-in-out flex items-center text-xs text-sm-red font-semibold no-underline"
            >
              more details <BsArrowRightShort className="text-xl" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recording;
