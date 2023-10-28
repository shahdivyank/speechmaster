"use client";
import { useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

const ExampleComponent = () => {
  const [audios, setAudio] = useState([]);
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setAudio([...audios, url]);
    console.log(audios);
    {
      audios.map((audio, index) => <div key={index} className="" />);
    }
  };

  return (
    <AudioRecorder onRecordingComplete={(blob) => addAudioElement(blob)} />
  );
};

export default ExampleComponent;
