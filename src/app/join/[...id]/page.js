"use client";

import { useEffect, useState } from "react";
import { socket } from "../../../../socket";
import { BiSolidSend } from "react-icons/bi";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const Page = ({ params }) => {
  const [frame, setFrame] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { data: session } = useSession();
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

  const handleSend = (e) => {
    e.preventDefault();

    if (message === "") {
      toast("❌ Please enter a message!");
      return;
    }

    socket.emit("message", {
      message,
      id: params.id[0],
      img: session.user.image,
    });

    setMessages([...messages, { message, timestamp: new Date() }]);
    setMessage("");
  };

  return (
    <div className="flex h-[80vh] p-2">
      <div className="w-3/4 flex justify-center items-center">
        {frame && <img src={frame} />}
        {!frame && (
          <div className="w-1/2 flex justify-center items-center text-center text-xl font-bold">
            Apologies! This connection is not taking longer than expected! If
            this continues to happen, please close this tab and open the link
            again.
          </div>
        )}
      </div>
      <div className="w-1/4 flex justify-end flex-col items-end overflow-hidden">
        {messages.map(({ message, timestamp }, index) => (
          <div className="flex justify-between items-center" key={index}>
            <span className="mx-3 text-right">{message}</span>
            <span className="text-sm-red bg-sm-red/20 mx-2 my-1 rounded px-1 py-0.5 whitespace-nowrap">
              {timestamp.toLocaleTimeString()}
            </span>
          </div>
        ))}
        <form onSubmit={handleSend} className="flex items-center my-2 w-full">
          <input
            placeholder="message"
            className="px-3 py-2 rounded outline-none w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <BiSolidSend
            className="text-white text-2xl mx-2 hover:!text-gray-100 hover:cursor-pointer"
            onClick={handleSend}
          />
        </form>
      </div>
    </div>
  );
};

export default Page;
