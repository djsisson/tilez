import { MouseEventHandler } from "react";
import { FaChevronLeft } from "react-icons/fa";

export default function LeftArrow({
  clickHandler,
}: {
  clickHandler: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      onClick={clickHandler}
      className={
        "col-start-1 flex cursor-pointer grid-cols-subgrid items-center rounded-lg p-4 font-bold uppercase transition delay-150 duration-300 ease-in-out hover:-translate-x-2 hover:scale-150"
      }
    >
      <FaChevronLeft className="fill-blue-500 shadow-blue-500"></FaChevronLeft>
    </div>
  );
}
