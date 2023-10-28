import { colors } from "@/data/Categories";

const Category = ({ text }) => {
  return (
    <div
      className={`${colors[text]} rounded-full px-2 mx-1 text-white text-sm`}
    >
      {text}
    </div>
  );
};

export default Category;
