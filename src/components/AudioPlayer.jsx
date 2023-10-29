"use client";
import { useEffect, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import AudioAnalysis from "./AudioAnalysis";

const AudioPlayer = ({
  globalIsPlaying,
  setDBEmotions,
  base64Audio,
  setBase64Audio,
  socket,
}) => {
  const { startRecording, stopRecording, recordingBlob, recordingTime } =
    useAudioRecorder(
      {
        noiseSuppression: false,
        echoCancellation: false,
      },
      (err) => console.table(err), // onNotAllowedOrFound
    );
  const [localIsRecording, setLocalIsRecording] = useState(false);
  const [currentBlob, setCurrentBlob] = useState(null);

  useEffect(() => {
    if (!globalIsPlaying) {
      return;
    }
    if (!localIsRecording) {
      startRecording();
      setLocalIsRecording(true);
      console.log("started recording audio");
    }

    if (recordingTime > 3) {
      stopRecording();
      console.log("stopped recording audio");
    }
    if (recordingBlob && recordingBlob != currentBlob) {
      setCurrentBlob(recordingBlob);
      addAudioElement(recordingBlob);
      setLocalIsRecording(false);
    }
  }, [globalIsPlaying, recordingTime, localIsRecording, recordingBlob]);

  const addAudioElement = (blob) => {
    const reader = new FileReader();
    console.log(blob);
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      setBase64Audio(reader.result.split(",")[1]);
    };
    socket.emit("audio", reader.result);
  };

  return (
    <AudioAnalysis setDBEmotions={setDBEmotions} base64Encoded={base64Audio} />
  );
};

export default AudioPlayer;
