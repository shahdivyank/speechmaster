import { POSTURES } from "@/data/Posture";
const Postures = ({ postures }) => {
  return (
    <>
      {Object.entries(POSTURES).map(([type, key], index) => {
        return (
          <div key={index} className="flex items-center">
            <div
              className={`mr-2 text-sm-white font-bold my-1 aspect-square bg-sm-red w-8 justify-center flex text-center rounded`}
            >
              {postures.filter((item) => item.type == key).length}
            </div>
            {type}
          </div>
        );
      })}
    </>
  );
};

export default Postures;
