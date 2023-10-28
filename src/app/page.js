"use client";
import TitleBar from "@/components/TitleBar";
import Recording from "@/components/Recording";
// import { recordings } from "../data/Recordings";
import NavBar from "@/components/NavBar";
import cat from "../../public/cat.png";
import { useEffect, useState } from "react";
import axios from "axios";
const home = () => {
  const [recordings, setRecordings] = useState([]);
  useEffect(() => {
    axios
      .get("/api/video")
      .then((response) => {
        setRecordings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(recordings);
  return (
    <div className="w-full min-h-screen flex">
      <NavBar
        image={cat}
        name="Evan Littlecat"
        email="evanmeow@email.com"
        categories={["Workshop", "Class Presentation", "Others"]}
      />
      <div className="p-3 w-3/4 bg-sm-beige">
        <TitleBar />
        {recordings.map((recording, index) => (
          <Recording
            key={index}
            videoId={recording.identifier}
            image={recording.image}
            title={recording.title}
            created={recording.created}
            modified={recording.modified}
            share={recording.share}
            format={`${index % 2 === 0 ? "bg-sm-lightgrey" : "bg-sm-white"} ${
              index === 0
                ? "rounded-t-lg"
                : index === recordings.length - 1
                ? "rounded-b-lg"
                : "rounded-none"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default home;
