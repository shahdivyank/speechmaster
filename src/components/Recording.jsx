import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BsArrowRightShort } from "react-icons/bs";
import Checkbox from "./Checkbox";
import Category from "./Category";
import VideoPlayer from "./VideoPlayer";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar } from "react-circular-progressbar";

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
  score,
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
  console.log(score);
  return (
    <div className={`w-full flex font-poppins items-center p-3 px-6 ${format}`}>
      <Checkbox state={selected} onClick={onClick} />
      <div className="w-[150px] ">
        <VideoPlayer videoId={id} />
      </div>
      <div className="w-full">
        <div className="flex justify-between w-full items-center gap-2">
          <div className="ml-2">
            <p className="m-0 font-bold">{title ? title : "no title"}</p>
            {share && (
              <div className="flex ">
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
            <div className="flex">
              {categories.map((category, index) => (
                <Category text={category} key={index} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 justify-end">
            <div className="w-1/4">
              <CircularProgressbar
                className="w-full"
                counterClockwise={true}
                value={score}
                maxValue={100}
                text={score}
              />
            </div>
            <div className="mr-5">
              <div className="h-full flex flex-col justify-center items-end">
                <p className=" text-xs m-0 text-sm-grey">created: {created}</p>
                <Link
                  href={`/review/${id}`}
                  className="hover:opacity-50 transition-transform ease-in-out flex items-center text-base text-sm-red font-semibold no-underline"
                >
                  more details <BsArrowRightShort className="text-xl" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recording;
