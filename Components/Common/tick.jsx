import { testimonalTickQuote } from "@/Data/Data";
import { FcCheckmark } from "react-icons/fc";

const Tick = () => {
  return (
    <>
      {testimonalTickQuote.map((item) => (
        <div className="tick col-lg-6 mt-4" key={item.id}>
          <div className="tick-section flex items-center gap-2">
            <span className="bg-white p-3 rounded-full">
              <FcCheckmark color="white" className="fs-3" />
            </span>
            <small>{item.quote}</small>
          </div>
        </div>
      ))}
    </>
  );
};

export default Tick;
