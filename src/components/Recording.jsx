import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BsArrowRightShort } from "react-icons/bs";
import Checkbox from "./Checkbox";
import Category from "./Category";
import VideoPlayer from "./VideoPlayer";

const Recording = ({
  id,
  recordings,
  setRecordings,
  image,
  title,
  share,
  created,
  modified,
  format,
  selected,
  categories,
}) => {
  const onClick = () => {
    setRecordings(
      recordings.map((recording) => {
        if (recording.identifier === id) {
          recording.selected = !recording.selected;
        }
        return recording;
      }),
    );
  };
  return (
    <div className={`w-full flex font-poppins items-center p-3 ${format}`}>
      <Checkbox state={selected} onClick={onClick} />
      <div className="w-[150px] ">
        <VideoPlayer videoId={id} />
      </div>
      <div className="w-full">
        <div className="flex justify-between w-full">
          <div className="ml-2">
            <p className="m-0">{title}</p>
            {share && (
              <div className="flex">
                <p className="m-0 pr-2 text-sm-grey">audience</p>
                {share.map((img, index) => (
                  <Image
                    width="25"
                    className="rounded-full aspect-square mx-0.5"
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
                href={`/review/${id}`}
                className="hover:opacity-50 transition-transform ease-in-out flex items-center text-xs text-sm-red font-semibold no-underline"
              >
                more details <BsArrowRightShort className="text-xl" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex">
          {categories.map((category, index) => (
            <Category text={category} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recording;
