import ToolBar from "@/components/ToolBar";
import Recording from "@/components/Recording";
import { recordings } from "../data/Recordings";
import NavBar from "@/components/NavBar";
import { user } from "@/data/User";

const home = () => {
  return (
    <div className="w-full min-h-screen flex">
      <NavBar categories={user.categories} />
      <div className="p-3 w-3/4 bg-sm-beige">
        <ToolBar />
        {recordings.map((recording, index) => (
          <Recording
            key={index}
            image={recording.image}
            title={recording.position}
            created={recording.created}
            modified={recording.modified}
            share={recording.share}
            format={`${index % 2 === 0 ? "bg-sm-lightgrey" : "bg-sm-white"} ${
              index === 0
                ? "rounded-t-lg"
                : index === recordings.length - 1
                ? "rounded-b-lg"
                : "rounded-none"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default home;
