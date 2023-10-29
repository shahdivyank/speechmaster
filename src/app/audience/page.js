"use client";
import { useEffect } from "react";
import { socket } from "../../../socket";

const Home = () => {
  useEffect(() => socketInitializer(), []);

  const socketInitializer = () => {
    socket.connect();
    socket.on("connect", () => {
      console.log("connected");
    });
  };

  return <>hello</>;
};

export default Home;
