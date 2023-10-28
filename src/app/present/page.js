"use client";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";
import { createRef } from "react";
import Webcam from "react-webcam";

const Page = () => {
  const ref = createRef(null);

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
    if (detector && ref) {
      if (ref.current) {
        const poses = await detector.estimatePoses(ref.current.video);
        checkHeadTilt(poses[0].keypoints);
        checkShoulderTilt(poses[0].keypoints);
        checkHipTilt(poses[0].keypoints);
        checkLegTitle(poses[0].keypoints);
      }
    }
  };

  load();

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
    <div>
      <Webcam ref={ref} mirrored={true} audio={false} />
    </div>
  );
};

export default Page;
