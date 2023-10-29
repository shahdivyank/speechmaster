import { EMOTIONS_NEG } from "@/data/Emotions";
import { POSTURES2 } from "@/data/Posture";

const Details = ({ data }) => {
  // console.log(data);
  return (
    <>
      <p className="font-bold text-xl self-start">report</p>
      {data.check === "postures" ? (
        <div>
          <div className="flex items-center">
            <div className="mr-2 font-bold text-sm-red my-1 bg-sm-red/20 text-center rounded h-fit px-2">
              {data.timestamp}
            </div>
            <div className="font-semibold">{POSTURES2[data.note]}</div>
          </div>
          <div>{data.message}</div>
        </div>
      ) : data.check === "humes" ? (
        <div>
          <div className="flex items-center">
            <div
              className={`mr-2 font-bold text-center rounded h-fit px-2 ${
                EMOTIONS_NEG.includes(data.emotionName)
                  ? " text-sm-orange my-1 bg-sm-orange/20"
                  : " text-sm-blue my-1 bg-sm-blue/20"
              }`}
            >
              {data.timestamp}
            </div>
            <div className="font-semibold">{data.emotionName}</div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center">
            <div
              className={`mr-2 font-bold text-center rounded h-fit px-2 text-sm-blue my-1 bg-sm-blue/20`}
            >
              {data.timestamp}
            </div>
            <div className="font-semibold">{data.message}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
