"use client";
import { BsPlayCircle, BsStopCircle } from "react-icons/bs";
import Webcam from "react-webcam";
import { useRef, useState, useCallback, useEffect } from "react";
import axios from "axios";
import * as poseDetection from "@tensorflow-models/pose-detection";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { socket } from "../../../socket";
import AudioPlayer from "@/components/AudioPlayer";
import Link from "next/link";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";

const live = () => {
  const { data: session } = useSession();
  const [recording, setRecording] = useState(false);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedVideo, setRecordedVideo] = useState([]);
  const [title, setTitle] = useState("");
  const [DBEmotions, setDBEmotions] = useState([]);

  const handleShare = () => {
    const link = `http://localhost:3000/join/${session.user.id}`;
    navigator.clipboard.writeText(link);
    toast("✅ Link copied to clipboard");
  };

  const capture = useCallback(() => {
    socket.emit("frames", webcamRef.current.getScreenshot());
  }, [webcamRef]);

  useEffect(() => {
    console.log(DBEmotions);
    const loadup = async () => {
      await tf.setBackend("webgl");
      await tf.ready();
    };

    loadup();
    load();

    socket.connect();

    socket.emit("join", session.user.id);

    const id = setInterval(() => {
      capture();
    }, 20);

    return () => clearInterval(id);
  }, []);

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

  const handleUpload = useCallback(async () => {
    if (recordedVideo.length) {
      const blob = new Blob(recordedVideo, {
        type: "video/webm",
      });
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        const base64data = reader.result;
        console.log(base64data);
        axios
          .post(`api/video`, {
            file: base64data,
            title: title,
            // TODO: add actrual categories
            categories: ["test", "menthy"],
          })
          .then((res) => {
            console.log(res);
            toast("✅ Video Uploaded Successfully");
          })
          .catch((err) => {
            console.log(err);
            toast("❌ Internal Server Error");
          });
      };

      setRecordedVideo([]);
    }
  }, [recordedVideo]);

  const load = async () => {
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING },
    );

    setInterval(() => {
      detect(detector);
    }, 200);
  };

  const detect = async (detector) => {
    if (detector && webcamRef) {
      if (webcamRef.current.video) {
        const poses = await detector.estimatePoses(webcamRef.current.video);
        if (poses[0]) {
          checkHeadTilt(poses[0].keypoints);
          checkShoulderTilt(poses[0].keypoints);
          checkHipTilt(poses[0].keypoints);
          checkLegTitle(poses[0].keypoints);
        }
      }
    }
    requestAnimationFrame(detect);
  };

  const checkHeadTilt = (poses) => {
    const leftEye = poses[1];
    const leftEar = poses[3];

    const rightEye = poses[2];
    const rightEar = poses[4];

    if (leftEar.y < leftEye.y || rightEar.y < rightEye.y) {
      console.log("LOOKING DOWN");
    }
  };

  const checkShoulderTilt = (poses) => {
    const leftShoulder = poses[5];
    const rightShoulder = poses[6];

    const margin = 25;

    if (
      leftShoulder.y + margin < rightShoulder.y ||
      leftShoulder.y - margin > rightShoulder.y ||
      rightShoulder.y + margin < leftShoulder.y ||
      rightShoulder.y - margin > leftShoulder.y
    ) {
      console.log("shoulders misaligned");
    }
  };

  const checkHipTilt = (poses) => {
    const leftHip = poses[11];
    const rightHip = poses[12];

    const margin = 25;

    if (
      leftHip.y + margin < rightHip.y ||
      leftHip.y - margin > rightHip.y ||
      rightHip.y + margin < leftHip.y ||
      rightHip.y - margin > leftHip.y
    ) {
      console.log("shoulders misaligned");
    }
  };

  const checkLegTitle = (poses) => {
    const leftHip = poses[11];
    const rightHip = poses[12];

    const leftKnee = poses[13];
    const rightKnee = poses[14];

    const leftAnkle = poses[15];
    const rightAnkle = poses[16];

    const margin = 25;

    console.log(leftHip.x, leftKnee.x, leftAnkle.x);

    if (
      leftHip.x + margin < leftKnee.x ||
      leftHip.x - margin > leftKnee.x ||
      leftHip.x + margin < leftAnkle.x ||
      leftHip.x - margin > leftAnkle.x
    ) {
      console.log("LEFT LEG IN CHECK");
    }

    if (
      rightHip.x + margin < rightKnee.x ||
      rightHip.x - margin > rightKnee.x ||
      rightHip.x + margin < rightAnkle.x ||
      rightHip.x - margin > rightAnkle.x
    ) {
      console.log("RIGHT LEG IN CHECK");
    }
  };
  return (
    <div className="w-full h-[90vh] flex justify-center">
      <div className="w-8/12 flex flex-col h-full justify-between items-center">
        <div className="h-6 w-full flex my-3">
          <textarea
            className="px-2 resize-none rounded w-full"
            placeholder="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <Webcam mirrored={true} audio={true} ref={webcamRef} />

        <div className="flex gap-3 items-center">
          {recording ? (
            <BsStopCircle
              className="text-sm-red text-5xl cursor-pointer"
              onClick={() => {
                setRecording(false);
                handleStopRecording();
              }}
            />
          ) : (
            <BsPlayCircle
              className="cursor-pointer text-5xl"
              onClick={() => {
                setRecording(true);
                handleStartRecording();
              }}
            />
          )}
          <button onClick={handleShare}>SHARE ME</button>
          {recordedVideo.length > 0 && (
            <Link
              className=" no-underline rounded bg-sm-red text-lg font-semibold text-white px-3 py-2 hover:cursor-pointer"
              onClick={handleUpload}
              href="/dashboard"
            >
              Upload
            </Link>
          )}
        </div>
      </div>
      <div className="w-1/5 m-4 bg-sm-white p-3 rounded-xl">
        <p className="font-bold text-xl p-0">emotional tone</p>
        <AudioPlayer
          globalIsPlaying={recording}
          setDBEmotions={setDBEmotions}
        />
      </div>
    </div>
  );
};

export default live;
