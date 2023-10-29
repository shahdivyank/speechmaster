"use client";
import { useEffect, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import AudioAnalysis from "./AudioAnalysis";

const AudioPlayer = ({globalIsPlaying}) => {
  const {
		startRecording,
		stopRecording,
		togglePauseResume,
		recordingBlob,
		isRecording,
		isPaused,
		recordingTime,
		mediaRecorder,
	} = useAudioRecorder(
		{
			noiseSuppression: true,
			echoCancellation: true,
		},
		(err) => console.table(err) // onNotAllowedOrFound
	);
  const [audios, setAudio] = useState([]);
  const [base64Audio, setBase64Audio] = useState();
  const [localIsRecording, setLocalIsRecording] = useState(false);

  useEffect(() => {
    if (!globalIsPlaying) {
      return;
    }
    if (!localIsRecording)
    {
     startRecording();
     setLocalIsRecording(true);
     console.log("started recording audio");
    }
     
    if (recordingTime>3)
    {
      stopRecording()
      console.log("stopped recording audio");
    }
    if (recordingBlob) {
			addAudioElement(recordingBlob);
		}
		
   
    

	}, [globalIsPlaying,recordingTime,recordingBlob]);
  
  // useEffect(() => {
  //   console.log("hello")
  //   startRecording();


  //   addAudioElement(recordingBlob)
    
  // }, [recordingBlob])
  const handlePlayer = () => {
    startRecording()
  }
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setAudio([...audios, url]);
    console.log(audios);
    {
      audios.map((audio, index) => <div key={index} className="" />);
      const reader = new FileReader();

      console.log(blob);
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        setBase64Audio(reader.result.split(",")[1]);
      };
      audios.map((audio, index) => <div key={index} className="" />);
    }
  };

  return (
    <div>
      <div>{recordingTime}</div>
      <button onClick={handlePlayer}>button</button>
      {base64Audio && <AudioAnalysis audioBlob={base64Audio} />}
    </div>
  );
};

export default AudioPlayer;
