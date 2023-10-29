import { BsArrowLeftShort } from "react-icons/bs";
import { POSTURES, POSTURES2 } from "@/data/Posture";
import { EMOTIONS_NEG, EMOTIONS_POS } from "@/data/Emotions";

const BreakDown = ({ setBreakdownView, postures, humes, messages }) => {
  console.log(messages);
  return (
    <div className="flex flex-col w-full overflow-y-scroll">
      <p
        className="self-start font-bold text-xl flex items-center justify-between cursor-pointer hover:text-sm-orange ease-in-out"
        onClick={() => setBreakdownView(false)}
      >
        <BsArrowLeftShort /> breakdown
      </p>
      <div className="self-start font-bold text-lg flex items-center justify-between cursor-pointer hover:text-sm-orange ease-in-out">
        Posture
      </div>
      {Object.entries(POSTURES).map(([type, key], index) => {
        const count = postures.filter((posture) => {
          return posture.type == key;
        }).length;
        return (
          count > 0 && (
            <>
              <div className="flex items-center gap-1 self-start font-bold">
                <div
                  className={`mr-2 text-sm-white my-1 aspect-square bg-sm-red w-8 justify-center flex text-center rounded`}
                >
                  {count}
                </div>
                {type}
              </div>
              {postures
                .filter((posture) => {
                  return posture.type == key;
                })
                .map((item, index) => (
                  <div key={index} className="flex items-start ml-4">
                    <div className="flex items-center">
                      <div className="mr-2 text-sm-red my-1 bg-sm-red/20 text-center rounded h-fit px-2 text-sm">
                        {item.timestamp}
                      </div>
                      <div className="font-semibold">
                        {POSTURES2[item.note]}
                      </div>
                    </div>
                    <div>{item.message}</div>
                  </div>
                ))}
            </>
          )
        );
      })}
      <div className="self-start font-bold text-lg flex items-center justify-between ease-in-out">
        Positive Tone
      </div>
      {EMOTIONS_POS.map((emotion, index) => {
        const count = humes.filter((hume) => {
          console.log(hume);
          return hume.emotionName == emotion;
        }).length;
        return (
          <div className="flex items-center self-start" key={index}>
            <div
              className={`mr-2 text-sm-white font-bold my-1 aspect-square bg-sm-blue w-8 justify-center flex text-center rounded`}
            >
              {count}
            </div>
            {emotion}
          </div>
        );
      })}
      <div className="self-start font-bold text-lg flex items-center justify-between ease-in-out">
        Negative Tone
      </div>
      {EMOTIONS_NEG.map((emotion, index) => {
        const count = humes.filter((hume) => {
          console.log(hume);
          return hume.emotionName == emotion;
        }).length;
        return (
          <div className="flex items-center self-start" key={index}>
            <div
              className={`mr-2 text-sm-white font-bold my-1 aspect-square bg-sm-orange w-8 justify-center flex text-center rounded`}
            >
              {count}
            </div>
            {emotion}
          </div>
        );
      })}
      <div className="self-start font-bold text-lg flex items-center justify-between ease-in-out">
        Messages
      </div>
      {messages.map((item, index) => (
        <div key={index} className="flex items-start ml-4">
          <div className="mr-2 text-sm-blue my-1 bg-sm-blue/20 text-center rounded h-fit px-2 text-sm">
            {item.timestamp}
          </div>
          <div>{item.message}</div>
        </div>
      ))}
    </div>
  );
};

export default BreakDown;
