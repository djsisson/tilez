import { FaChevronLeft } from "react-icons/fa";

export default function LeftArrow({clickHandler}: {clickHandler : any}){
    return (<div onClick={clickHandler}
        className={`transition ease-in-out delay-150 duration-300 hover:scale-150 hover:-translate-x-2 cursor-pointer font-bold uppercase rounded-lg px-6 py-4 grid-cols-subgrid col-start-1 flex items-center`}
      >
        <FaChevronLeft className="scale-150 "></FaChevronLeft>
      </div>)
}