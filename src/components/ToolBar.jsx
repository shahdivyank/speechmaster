import React from "react";
import Link from "next/link";
import { BsTrash3 } from "react-icons/bs";
import toast from "react-hot-toast";
import axios from "axios";

const format = "mx-1 active:opacity-70 hover:text-sm-orange cursor-pointer";

const ToolBar = ({ recordings, setRecordings }) => {
  const handleDelete = () => {
    const keep = recordings.filter((recording) => !recording.selected);
    const remove = [];
    recordings.forEach((recording) => {
      if (recording.selected) remove.push(recording.identifier);
    });

    if (remove.length === 0) {
      toast("❌ Select at least 1 recording");
      return;
    }

    axios
      .put("/api/video", { title: "", videoId: remove, action: "delete" })
      .then(() => {
        toast("✅ Sucessfully deleted");
      })
      .catch((err) => toast("❌ Internal Server Error"));

    setRecordings(keep);
  };

  return (
    <div className="flex justify-between text-black font-poppins items-end pb-3 ease-in-out transition-transform">
      <div className="flex gap-2">
        <p className="font-bold text-xl m-0 p-0">All Speeches</p>
        <p className="font-bold text-xl m-0 p-0 text-sm-red">
          {recordings.length}
        </p>
      </div>

      <div className="text-xl flex items-center">
        <BsTrash3 className={`${format}`} onClick={handleDelete} />
        <Link
          href="/live"
          className=" hover:scale-110 active:opacity-70 ml-2 no-underline text-white bg-sm-blue ease-in-out transition-transform text-lg font-semibold rounded-full h-fit px-3.5 pb-0.5 text-center"
        >
          + new
        </Link>
      </div>
    </div>
  );
};

export default ToolBar;
