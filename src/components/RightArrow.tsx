import { FaChevronRight } from "react-icons/fa";

export default function RightArrow({ clickHandler }: { clickHandler: any }) {
  return (
    <div
      onClick={clickHandler}
      className={`flex cursor-pointer grid-cols-subgrid items-center rounded-lg px-6 py-4 font-bold uppercase transition delay-150 duration-300 ease-in-out hover:translate-x-2 hover:scale-150`}
    >
      <FaChevronRight className="scale-150"></FaChevronRight>
    </div>
  );
}
