import { counterData } from "@/Data/Data";
import { VscChecklist } from "react-icons/vsc";
const Counter = () => {
  return (
    <div className="counter container-fluid  bg-counterBg py-20 relative">
      <div className="container relative">
        <div className="row w-10/12 m-auto counter-name">
          {counterData.map((item) => (
              <div className="col-lg-3 col-md-6 col-sm-12 text-center" key={item.id}>
              <div className="flex gap-3 items-center justify-center">
                {item.icon}
                <span className="text-white text-1xl font-semibold">
                          {item.customer}
                </span>
                  </div>
                  <br />
              <span className="text-white font-medium text-1xl">
                {item.info}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Counter;
