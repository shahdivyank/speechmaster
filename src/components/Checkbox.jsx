import { FaCheck } from "react-icons/fa";

const Checkbox = ({ state, onClick }) => {
  return (
    <div
      className="w-5 rounded cursor-pointer hover:bg-sm-lightgrey h-5 bg-white border-sm-light grey border-2 mr-3"
      onClick={onClick}
    >
      {state && <FaCheck />}
    </div>
  );
};

export default Checkbox;
