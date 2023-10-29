"use client";
import { BsArrowRightShort } from "react-icons/bs";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "react-circular-progressbar/dist/styles.css";
import VideoPlayer from "@/components/VideoPlayer";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Postures from "@/components/Postures";
import Details from "@/components/Details";
import BreakDown from "@/components/BreakDown";
import { EMOTIONS_NEG, EMOTIONS_POS } from "@/data/Emotions";

const review = ({ params }) => {
  const [title, setTitle] = useState("");
  const [vedio, setVedio] = useState({});
  const [breakdownView, setBreakdownView] = useState(false);
  const [postures, setPostures] = useState([]);
  const [humes, setHumes] = useState([]);
  const [selectedTag, setSelectedTag] = useState({});

  useEffect(() => {
    axios.get(`/api/video?videoId=${params.id}`).then((res) => {
      setVedio(res.data.video);
      setTitle(res.data.video.title);
      setPostures(res.data.postures);
      setHumes(res.data.humes);
    });
  }, []);
  return (
    <div className="w-full flex justify-center bg-sm-beige h-[90vh]">
      <div className="w-8/12 flex flex-col">
        <div className="h-6 w-full flex my-3">
          <textarea
            className="px-2 resize-none rounded w-full"
            placeholder="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <div
            className="px-2.5 pt-0.5 text-sm-white bg-sm-red rounded text-xs hover:cursor-pointer"
            onClick={() => {
              axios
                .put("/api/video", {
                  title: title,
                  videoId: params.id,
                  action: "update",
                })
                .then((res) => {
                  toast("✅ successfully updated");
                });
            }}
          >
            save
          </div>
        </div>
        <VideoPlayer
          videoId={params.id}
          timeLine={true}
          controls={false}
          humes={humes}
          postures={postures}
          setSelectedTag={setSelectedTag}
        />
      </div>

      <div className="w-1/4 m-4 bg-sm-white p-3 rounded-xl flex flex-col items-center gap-4">
        {breakdownView ? (
          <BreakDown
            postures={postures}
            humes={humes}
            setBreakdownView={setBreakdownView}
          />
        ) : (
          <>
            <p className="font-bold text-xl">report</p>
            <div className="w-1/3">
              <CircularProgressbar
                className="-mt-5"
                counterClockwise={true}
                value={vedio.score}
                maxValue={100}
                text={vedio.score}
              />
            </div>
            <p
              className="self-start font-bold text-xl flex items-center justify-between cursor-pointer hover:text-sm-orange ease-in-out"
              onClick={() => setBreakdownView(true)}
            >
              breakdown <BsArrowRightShort />
            </p>
            <div className=" p-2 rounded-2xl bg-sm-lightbeige w-11/12">
              <Postures postures={postures} />
              <div className="flex items-center">
                <div
                  className={`mr-2 text-sm-white font-bold my-1 aspect-square bg-sm-blue w-8 justify-center flex text-center rounded`}
                >
                  {
                    humes.filter((hume) =>
                      EMOTIONS_POS.includes(hume.emotionName),
                    ).length
                  }
                </div>
                Positive Tone
              </div>
              <div className="flex items-center">
                <div
                  className={`mr-2 text-sm-white font-bold my-1 aspect-square bg-sm-orange w-8 justify-center flex text-center rounded`}
                >
                  {
                    humes.filter((hume) =>
                      EMOTIONS_NEG.includes(hume.emotionName),
                    ).length
                  }
                </div>
                Negative Tone
              </div>
            </div>
            <Details data={selectedTag} />
          </>
        )}
      </div>
    </div>
  );
};

export default review;
