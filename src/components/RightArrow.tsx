import { FaChevronRight } from "react-icons/fa";

export default function RightArrow({ clickHandler }: { clickHandler: any }) {
  return (
    <div
      onClick={clickHandler}
      className={`transition ease-in-out delay-150 duration-300 hover:translate-x-2 hover:scale-150 cursor-pointer font-bold uppercase rounded-lg px-6 py-4 grid-cols-subgrid flex items-center`}
    >
      <FaChevronRight className="scale-150"></FaChevronRight>
    </div>
  );
}
