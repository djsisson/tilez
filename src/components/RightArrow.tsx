import { MouseEventHandler } from "react";
import { FaChevronRight } from "react-icons/fa";

export default function RightArrow({
  clickHandler,
}: {
  clickHandler: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      onClick={clickHandler}
      className={`flex cursor-pointer grid-cols-subgrid items-center rounded-lg p-4 font-bold uppercase transition delay-150 duration-300 ease-in-out hover:translate-x-2 hover:scale-150`}
    >
      <FaChevronRight className="fill-blue-500 shadow-blue-500"></FaChevronRight>
    </div>
  );
}
