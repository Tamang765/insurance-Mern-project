import { AiFillPhone } from "react-icons/ai";
import CustomButton from "./button";
import Link from "next/link";

const FindAgent = () => {
  return (
    <div className="findagent container-fluid relative shadow-xl rounded-xl mt-5 w-10/12 bg-bgFindAgent bg-no-repeat h-[28vh]  before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-customCard before:opacity-90 before:rounded-xl ">
      <div
        className="container text-white "
        style={{ position: "inherit", zIndex: "20", height: "inherit" }}
      >
        <div
          className="flex items-center  gap-2 justify-between "
          style={{ height: "inherit" }}
        >
          <h2 className="font-semibold text-4xl">Find a local insurance agent</h2>
          <div className="flex items-center gap-2 w-25 flex-wrap">
            <span className="rounded-full border p-2">
              <AiFillPhone className="fs-2" color="powderblue" />
            </span>
            <div className="flex flex-column">
              <Link href="tel+:987654123123">+987654123123</Link>
              <small>Contact us</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindAgent;
