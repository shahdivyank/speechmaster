import { FaCheck } from "react-icons/fa";

const Checkbox = ({ state, onClick }) => {
  return (
    <div className="w-6 h-6 bg-white p-1" onClick={onClick}>
      {state && <FaCheck />}
    </div>
  );
};

export default Checkbox;
