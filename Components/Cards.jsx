import { CardsData } from "@/Data/Data";
import Image from "next/image";
import Title from "./Common/Title";

const Cards = () => {
  return (
    <div className="cards container-fluid my-[4rem]">
      <div className="cards-section container w-10/12 pt-3">
        <div className="container">
          <center>
            <Title title="WHY TO DO INSURANCE?" />
          </center>
          <div className="row pt-9">
            {CardsData.map((items) => (
              <div className="col-lg-4 col-sm-12 col-md-6 mt-3 " key={items.id}>
                <div
                  className="card relative overflow-hidden  px-3 border-0 rounded-[20px] bg-gray-100"
                  style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                >
                  <div className="absolute card-icon left-[-2rem] z-10 top-[-3rem] bg-customSpan w-[40%] h-[48%] rounded-full"></div>
                  <div className="flex justify-between">
                    <span className="z-20 w-fit ">{items.icon}</span>
                    <div className="card-num text-black text-[100px] z-10 fw-bold flex">
                      {items.id}
                    </div>
                  </div>
                  <div className="card-body mt-4 z-10 ">
                    <h1 className="card-title fw-bold">{items.heading}</h1>
                    <p className="card-text">{items.detail}</p>
                    <div className="card-bg flex m-auto justify-end "></div>
                  </div>
                  <div className="overlay absolute bottom-0 left-0 right-0 bg-customBlue w-full h-0"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cards;
