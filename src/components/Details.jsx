import { POSTURES2 } from "@/data/Posture";

const Details = ({ data }) => {
  return (
    <>
      <p className="font-bold text-xl self-start">report</p>
      {data.type === "posture" && (
        <div>
          <div className="flex items-center">
            <div className="mr-2 text-sm-white font-bold my-1 bg-sm-red text-center rounded h-fit px-2">
              {data.time}
            </div>
            <div className="font-semibold">{POSTURES2[data.note]}</div>
          </div>
          <div>{data.message}</div>
        </div>
      )}
    </>
  );
};

export default Details;
