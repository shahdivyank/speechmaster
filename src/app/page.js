"use client";
import ToolBar from "@/components/ToolBar";
import Recording from "@/components/Recording";
import NavBar from "@/components/NavBar";
import { useState, useEffect } from "react";
import { colors } from "@/data/Categories";
import axios from "axios";

const home = () => {
  const [recordings, setRecordings] = useState([]);
  useEffect(() => {
    axios
      .get("/api/video")
      .then((response) => {
        setRecordings(
          response.data.map((r) => ({
            ...r,
            categories: r.categories.split(","),
            selected: false,
          })),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="w-full min-h-screen flex">
      <NavBar
        categories={Object.keys(colors)}
        recordings={recordings}
        setRecordings={setRecordings}
      />
      <div className="p-3 w-3/4 bg-sm-beige">
        <ToolBar recordings={recordings} setRecordings={setRecordings} />
        {recordings
          .filter((r) => !r.hidden)
          .map((recording, index) => (
            <Recording
              key={index}
              id={recording.identifier}
              recordings={recordings}
              setRecordings={setRecordings}
              image={recording.image}
              title={recording.title}
              created={recording.created}
              modified={recording.modified}
              share={recording.share}
              selected={recording.selected}
              categories={recording.categories}
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
