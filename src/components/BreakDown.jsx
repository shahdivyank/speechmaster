import { BsArrowLeftShort } from "react-icons/bs";
import { POSTURES, POSTURES2 } from "@/data/Posture";

const BreakDown = ({ setBreakdownView, postures, tags }) => {
  return (
    <>
      <p
        className="self-start font-bold text-xl flex items-center justify-between cursor-pointer hover:text-sm-orange ease-in-out"
        onClick={() => setBreakdownView(false)}
      >
        <BsArrowLeftShort /> breakdown
      </p>
      {Object.entries(POSTURES).map(([type, key], index) => {
        return (
          postures.filter((item) => item.type == key).length > 0 && (
            <>
              <div className="flex items-center gap-1 self-start">
                <div
                  className={`mr-2 text-sm-white font-bold my-1 aspect-square bg-sm-red w-6 text-center rounded`}
                >
                  {postures.filter((item) => item.type == key).length}
                </div>
                {type}
              </div>
              {tags
                .filter((item) => {
                  console.log(item);
                  return item.pos == key;
                })
                .map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center">
                      <div className="mr-2 text-sm-white font-bold my-1 bg-sm-red text-center rounded h-fit px-2 ">
                        {item.time}
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
    </>
  );
};

export default BreakDown;
