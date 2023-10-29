"use client";
import { useEffect, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import AudioAnalysis from "./AudioAnalysis";

const AudioPlayer = ({ globalIsPlaying }) => {
  const { startRecording, stopRecording, recordingBlob, recordingTime } =
    useAudioRecorder(
      {
        noiseSuppression: true,
        echoCancellation: true,
      },
      (err) => console.table(err), // onNotAllowedOrFound
    );
  const [base64Audio, setBase64Audio] = useState();
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
  };

  return (
    <div>{base64Audio && <AudioAnalysis base64Encoded={base64Audio} />}</div>
  );
};

export default AudioPlayer;
