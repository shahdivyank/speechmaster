"use client";
import AudioPlayer from "@/components/AudioPlayer";
import { useState } from "react";
const voice = () => {
	const [playing, setPlaying] = useState(false);
  const handlePlay = () => {
    playing ? setPlaying(false) : setPlaying(true);
  }
	return (
		<div className="text-black">
			<button onClick={handlePlay}>play</button>
			<AudioPlayer globalIsPlaying={playing} />
		</div>
	);
};

export default voice;
