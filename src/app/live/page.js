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
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import Checkbox from "@/components/Checkbox";
import { useRouter } from "next/navigation";
import { useInterval } from "@/components/useInterval";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Live = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const { data: session } = useSession();
  const [recording, setRecording] = useState(false);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [notifs, setNotifs] = useState([]);
  const [recordedVideo, setRecordedVideo] = useState([]);
  const [title, setTitle] = useState("");
  const [base64Audio, setBase64Audio] = useState();
  const [tags, setTags] = useState({
    Workshops: false,
    "Class Presentations": false,
    Other: false,
  });
  const [body, setBody] = useState("upper");
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
    // load();

    socket.connect();

    socket.emit("join", session.user.id);

    const id = setInterval(() => {
      capture();
    }, 20);

    return () => clearInterval(id);
  }, []);

  const handleStartRecording = useCallback(() => {
    setStartTime(new Date());
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
    setLoading(true);
    if (recordedVideo.length) {
      const blob = new Blob(recordedVideo, {
        type: "video/webm",
      });
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        const base64data = reader.result;

        axios
          .post(`/api/video`, {
            file: base64data,
            title: title,
            categories: Object.keys(tags).filter((tag) => tags[tag]),
            created: startTime,
          })
          .then((res) => {
            toast("✅ Video Uploaded Successfully");
            console.log(res.data.identifier);
            axios
              .post(`/api/posture`, {
                postures: notifs,
                videoId: res.data.identifier,
              })
              .then((res) => {
                toast("✅ Postures Uploaded Successfully");
                setRecordedVideo([]);
                router.push("/dashboard");
                setLoading(false);
              });
          })
          .catch((err) => {
            toast("❌ Internal Server Error");
          });
        console.log("final notifs", notifs);
      };
    }
  }, [recordedVideo]);

  // const load = async () => {
  //   const detector = await poseDetection.createDetector(
  //     poseDetection.SupportedModels.MoveNet,
  //     { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING }
  //   );
  // };

  useInterval(async () => {
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING },
    );
    detect(detector);
  }, 3000);

  const detect = async (detector) => {
    console.log(notifs);
    if (detector && webcamRef) {
      if (webcamRef.current.video) {
        const poses = await detector.estimatePoses(webcamRef.current.video);
        if (poses[0]) {
          checkHeadTilt(poses[0].keypoints);
          checkShoulderTilt(poses[0].keypoints);
          console.log(body);
          body !== "upper" && checkHipTilt(poses[0].keypoints);
          body !== "upper" && checkLegTitle(poses[0].keypoints);
        }
      }
    }
    requestAnimationFrame(detect);
  };

  const checkHeadTilt = async (poses) => {
    const leftEye = poses[1];
    const leftEar = poses[3];

    const rightEye = poses[2];
    const rightEar = poses[4];

    if (leftEar.y < leftEye.y || rightEar.y < rightEye.y) {
      setNotifs((prev) => [
        ...prev,
        {
          timestamp: new Date(),
          type: "face",
          message: "Make sure to look towards the audience!",
        },
      ]);
      console.log("LOOKING DOWN");
    }
  };

  const checkShoulderTilt = async (poses) => {
    const leftShoulder = poses[5];
    const rightShoulder = poses[6];

    const margin = 25;

    if (
      leftShoulder.y + margin < rightShoulder.y ||
      leftShoulder.y - margin > rightShoulder.y ||
      rightShoulder.y + margin < leftShoulder.y ||
      rightShoulder.y - margin > leftShoulder.y
    ) {
      setNotifs([
        ...notifs,
        {
          timestamp: new Date(),
          type: "shoulder",
          message: "Attempt to stand straight!",
        },
      ]);
      console.log("shoulders misaligned");
    }
  };

  const checkHipTilt = async (poses) => {
    const leftHip = poses[11];
    const rightHip = poses[12];

    const margin = 25;

    if (
      leftHip.y + margin < rightHip.y ||
      leftHip.y - margin > rightHip.y ||
      rightHip.y + margin < leftHip.y ||
      rightHip.y - margin > leftHip.y
    ) {
      setNotifs([
        ...notifs,
        {
          timestamp: new Date(),
          type: "hip",
          message: "Attempt to stand straight!",
        },
      ]);
      console.log("shoulders misaligned");
    }
  };

  const checkLegTitle = async (poses) => {
    const leftHip = poses[11];
    const rightHip = poses[12];

    const leftKnee = poses[13];
    const rightKnee = poses[14];

    const leftAnkle = poses[15];
    const rightAnkle = poses[16];

    const margin = 25;

    if (
      leftHip.x + margin < leftKnee.x ||
      leftHip.x - margin > leftKnee.x ||
      leftHip.x + margin < leftAnkle.x ||
      leftHip.x - margin > leftAnkle.x ||
      rightHip.x + margin < rightKnee.x ||
      rightHip.x - margin > rightKnee.x ||
      rightHip.x + margin < rightAnkle.x ||
      rightHip.x - margin > rightAnkle.x
    ) {
      setNotifs([
        ...notifs,
        {
          timestamp: new Date(),
          type: "hip",
          message: "Avoid moving your legs too much!",
        },
      ]);
      console.log("KEEP LEG IN CHECK");
    }
  };
  return (
    <div className="w-full h-[90vh] flex justify-center">
      <div className="w-8/12 flex flex-col h-full justify-between items-center">
        <div className="w-full flex flex-col my-3">
          <input
            className="px-2 py-1 outline-none resize-none rounded w-full"
            placeholder="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <div className="flex">
            {["Workshops", "Class Presentations", "Other"].map((tag, index) => (
              <div className="flex items-center mx-2" key={index}>
                <Checkbox
                  state={tags[tag]}
                  onClick={() => setTags({ ...tags, [tag]: !tags[tag] })}
                />
                <div>{tag}</div>
              </div>
            ))}
          </div>

          <div className="flex">
            {[
              { name: "Upper Body Only", value: "upper" },
              { name: "Whole Body", value: "whole" },
            ].map((tag, index) => (
              <div className="flex items-center mx-2" key={index}>
                <Checkbox
                  state={body === tag.value}
                  onClick={() => setBody(tag.value)}
                />
                <div>{tag.name}</div>
              </div>
            ))}
          </div>
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
            <button
              className=" no-underline rounded bg-sm-red text-lg font-semibold text-white px-3 py-2 hover:cursor-pointer"
              onClick={handleUpload}
            >
              Upload
            </button>
          )}
        </div>
        {loading && (
          <div className="flex items-center gap-2">
            Uploading...
            <AiOutlineLoading3Quarters className="text-sm-red animate-spin" />
          </div>
        )}
      </div>
      <div className="w-1/5 m-4 bg-sm-white p-3 rounded-xl">
        <p className="font-bold text-xl p-0">emotional tone</p>
        <div className="bg-sm-lightgrey pb-2 px-2 h-20 pt-1 rounded-lg font-semibold">
          <AudioPlayer
            globalIsPlaying={recording}
            setBase64Audio={setBase64Audio}
            base64Audio={base64Audio}
            socket={socket}
            setDBEmotions={setDBEmotions}
          />
        </div>
      </div>
    </div>
  );
};

export default Live;
