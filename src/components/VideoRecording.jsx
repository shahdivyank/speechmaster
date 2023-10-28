"use client";
import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

import React from "react";
import axios from "axios";

const VideoRecording = () => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState([]);

  const handleStartRecording = useCallback(() => {
    setRecording(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable,
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setRecording, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedVideo((prev) => prev.concat(data));
      }
    },
    [setRecordedVideo],
  );

  const handleStopRecording = useCallback(() => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  }, [mediaRecorderRef, webcamRef, setRecording]);

  const handleDownload = useCallback(() => {
    console.log(recordedVideo);
    axios.post("/api/youtube", recordedVideo).then((res) => {});
    // if (recordedVideo.length) {
    //   const blob = new Blob(recordedVideo, {
    //     type: "video/webm",
    //   });
    //   const url = URL.createObjectURL(blob);
    //   const a = document.createElement("a");
    //   document.body.appendChild(a);
    //   a.style = "display: none";
    //   a.href = url;
    //   a.download = "test.webm";
    //   a.click();
    //   window.URL.revokeObjectURL(url);
    //   setRecordedVideo([]);
    // }
  }, [recordedVideo]);

  return (
    <>
      <Webcam mirrored={true} audio={true} ref={webcamRef} />
      {recording ? (
        <button onClick={handleStopRecording}>Stop Capture</button>
      ) : (
        <button onClick={handleStartRecording}>Start Capture</button>
      )}
      {recordedVideo.length > 0 && (
        <button onClick={handleDownload}>Download</button>
      )}
    </>
  );
};

export default VideoRecording;
