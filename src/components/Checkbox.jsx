import { FaCheck } from "react-icons/fa";

const Checkbox = ({ state, onClick }) => {
  return (
    <div
      className={`w-5 cursor-pointer h-5 flex items-center justify-center rounded-none ${
        state ? " bg-sm-blue" : " bg-white"
      } border-sm-light grey border-2 mr-3 aspect-square`}
      onClick={onClick}
    >
      {state && <FaCheck className="text-sm text-sm-white" />}
    </div>
  );
};

export default Checkbox;
