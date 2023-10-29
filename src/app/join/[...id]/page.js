"use client";

import { useEffect, useState } from "react";
import { socket } from "../../../../socket";

const Page = ({ params }) => {
  const [frame, setFrame] = useState(null);

  useEffect(() => {
    socket.connect();
    socket.emit("join", params.id[0]);

    socket.on("frames", (image) => {
      setFrame(image);
    });

    socket.on("audio", (audio) => {
      const voice = new Audio(audio);
      voice.play();
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <img src={frame} />
    </div>
  );
};

export default Page;
