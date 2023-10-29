"use client";

import { useEffect, useRef, useState } from "react";

const AudioAnalysis = ({ base64Encoded, setDBEmotions }) => {
  const apiKey = process.env.NEXT_PUBLIC_HUME_AI_KEY;
  const socketRef = useRef(WebSocket);
  const serverReadyRef = useRef(true);

  const [humePredictions, setHumePredictions] = useState(null);
  const [topEmotions, setTopEmotions] = useState({
    Amusement: 0,
    Excitement: 0,
    Interest: 0,
    Determination: 0,
    Joy: 0,
    Anger: 0,
    Confusion: 0,
    Awkwardness: 0,
    Boredom: 0,
    Tiredness: 0,
  });
  const [currentEmotions, setCurrentEmotions] = useState([]);

  useEffect(() => {
    if (!base64Encoded) {
      console.log("No audio blob");
      return;
    }
    connect();

    return () => {
      console.log("Tearing down component");
      stopEverything();
    };
  }, [base64Encoded]);

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
          data: base64Encoded,
        }),
      );
    }
  }

  async function socketOnMessage(event) {
    const response = JSON.parse(event.data);
    if (response) {
      console.log("Got response", response.prosody);
      if (response.prosody && response.prosody.predictions) {
        setHumePredictions(response.prosody.predictions[0].emotions);
        if (humePredictions) {
          setHumePredictions(
            humePredictions.sort((a, b) => b.score - a.score).slice(0, 3),
          );
          console.log("Predictions: ");
          console.log(humePredictions.slice(0, 3));

          setTopEmotions((prev) => {
            const newTopEmotions = { ...prev };
            humePredictions.slice(0, 3).forEach((emotion) => {
              console.log("current emotion " + emotion.name);
              if (
                newTopEmotions.hasOwnProperty(emotion.name) &&
                emotion.score >= 0.1
              ) {
                newTopEmotions[emotion.name] += 1;

                setDBEmotions((prevDBEmotions) => {
                  const newEmotionEntry = {
                    timestamp: new Date(),
                    emotionName: emotion.name,
                  };

                  const updatedDBEmotions = [
                    ...prevDBEmotions,
                    newEmotionEntry,
                  ];

                  return updatedDBEmotions;
                });
                setCurrentEmotions((prev) => {
                  if (!prev.includes(emotion.name)) {
                    const newCurrentEmotions = [...prev, emotion.name];

                    if (newCurrentEmotions.length > 3) {
                      newCurrentEmotions.shift();
                    }

                    return newCurrentEmotions;
                  }
                  return prev;
                });
              }
            });
            return newTopEmotions;
          });

          console.log(topEmotions);
          setHumePredictions(null);
        }
      }
    }
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
  return (
    <div>
      {currentEmotions.length != 0 ? (
        <div>
          {currentEmotions.map((emotion, index) => {
            const arrayIndex = Object.keys(topEmotions).indexOf(emotion);
            if (arrayIndex < 5) {
              return index == currentEmotions.length - 1 ? (
                <div key={index} className="flex font-bold gap-1 items-center">
                  <div className="rounded-full p-2 bg-sm-blue"></div>
                  <div>{emotion}</div>
                </div>
              ) : (
                <div key={index} className="flex gap-1 items-center">
                  <div className="rounded-full p-2 bg-sm-blue"></div>
                  <div>{emotion}</div>
                </div>
              );
            } else {
              if (index == currentEmotions.length - 1) {
                return (
                  <div
                    key={index}
                    className="flex font-bold gap-1 items-center"
                  >
                    <div className="rounded-full p-2  bg-sm-red"></div>
                    <div>{emotion}</div>
                  </div>
                );
              } else
                return (
                  <div key={index} className="flex gap-1 items-center">
                    <div className="rounded-full p-2  bg-sm-red"></div>
                    <div>{emotion}</div>
                  </div>
                );
            }
          })}
        </div>
      ) : (
        <p className="p-0 m-0">awaiting voice input</p>
      )}
    </div>
  );
};

export default AudioAnalysis;
