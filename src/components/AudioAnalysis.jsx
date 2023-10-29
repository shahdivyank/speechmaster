"use client";

import { useEffect, useRef, useState } from "react";

const AudioAnalysis = ({ audioBlob }) => {
  const apiKey = process.env.NEXT_PUBLIC_HUME_AI_KEY;
  const socketRef = useRef(WebSocket);
  const serverReadyRef = useRef(true);

  const [humePredictions, setHumePredictions] = useState(null);

  useEffect(() => {
    connect();

    return () => {
      console.log("Tearing down component");
      stopEverything();
    };
  });

  function connect() {
    const socketUrl = `wss://api.hume.ai/v0/stream/models?apiKey=${apiKey}`;
    serverReadyRef.current = true;
    socketRef.current = new WebSocket(socketUrl);
    socketRef.current.onopen = socketOnOpen;
    socketRef.current.onmessage = socketOnMessage;
  }

  async function socketOnOpen() {
    console.log("Socket connected!");
    if (serverReadyRef.current) {
      sendRequest();
    }
  }
  async function sendRequest() {
    const socket = socketRef.current;
    if (!socket) {
      console.log("No socket on state");
      return;
    }
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          models: {
            prosody: {},
          },
          data: audioBlob,
        }),
      );
    }
  }

  async function socketOnMessage(event) {
    const response = JSON.parse(event.data);
    console.log("Got response", response);
    if (response) {
      console.log(response.prosody);
      response.prosody.predictions
        ? setHumePredictions(response.prosody.predictions[0].emotions[0])
        : null;
    }
    response ? setHumePredictions(response.prosody.predictions) : null;
    return;
  }

  const stopEverything = () => {
    console.log("Stopping everything...");
    const socket = socketRef.current;
    if (socket) {
      console.log("Closing socket");
      socket.close();
      socketRef.current = null;
    } else {
      console.warn("Could not close socket, not initialized yet");
    }
  };
  return <div>{humePredictions && <div></div>}</div>;
};

export default AudioAnalysis;
