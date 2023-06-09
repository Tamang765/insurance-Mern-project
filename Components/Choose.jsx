import Image from "next/image";
import Title from "./Common/Title";
import { Card } from "react-bootstrap";
import { FaHandSparkles } from "react-icons/fa";

const Choose = () => {
  return (
    <div className="choose container-fluid relative h-[107vh] bg-customChooseBg p-0 overflow-hidden">
      <div className="topimg absolute top-[-13rem] right-[31rem] z-10">
        <img src="/media/choose/topangle.jpg" alt="angle" />
      </div>
      <div className="topimg absolute top-[-17rem] right-[7rem]">
        <img src="/media/choose/topangle2.jpg" alt="angle" />
      </div>
      <div className="bg-choose w-[99%] h-[100vh]  absolute"></div>
      <div className="right-img-choose  w-full flex justify-end  absolute h-[100vh] p-0 z-20 object-cover">
        <img
          src="/media/choose/rightimage.jpg"
          alt="insur-img"
          className="pt-[7rem] w-[47rem] h-[112vh] object-cover"
        />
      </div>
      <div className="right-img-bg w-full flex justify-end  absolute ">
        <img src="/media/choose/rightbg.jpg" alt="" />
      </div>
      <div className="right-img-bg w-full flex justify-end  absolute bottom-0">
        <img src="/media/choose/rightbg.jpg" alt="" />
      </div>
      <div className="container absolute h-full flex z-30">
        <div className="row w-10/12 m-auto choose-section">
          <div className="col-lg-6 col-sm-12 text-white pr-[1rem]">
            <Title title="Why Choose Inr" />
            <div className="flex flex-col gap-4">
              <h1 className="text-5xl font-semibold">
                Few reasons for people choosing insur
              </h1>
              <p className="mt-3">
                Ut et laboris dolore qui aliqua officia ea cillum id deserunt
                incididunt. Mollit reprehenderit dolore in culpa nulla
              </p>
            </div>
            <div className="card-group row my-5 gap-2 m-auto">
              <div className="bg-customCard cardArea col-lg-5 col-md-6 col-sm-12 py-4 relative overflow-hidden rounded-[15px]">
                <div className="card-body m-auto ">
                  <FaHandSparkles
                    color="lightblue"
                    className="text-8xl m-auto"
                  />
                  <div className="title text-center">Fast & Easy Access</div>
                  <div className="overlay-choose text-center absolute  text-[10px]  h-0 transition-ease duration-5000 ">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Sequi, a!
                  </div>
                </div>
              </div>
              <div className="bg-customCard cardArea col-lg-5 col-md-6 col-sm-12 py-4 relative overflow-hidden rounded-[15px]">
                <div className="card-body m-auto ">
                  <FaHandSparkles
                    color="lightblue"
                    className="text-8xl m-auto"
                  />
                  <div className="title text-center">Fast & Easy Access</div>
                  <div className="overlay-choose text-center absolute  text-[10px]  h-0 transition-ease duration-8000 ">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Sequi, a!
                  </div>
                </div>
              </div>
              <div className="bg-customCard cardArea col-lg-5 col-md-6 col-sm-12 py-4 relative overflow-hidden rounded-[15px]">
                <div className="card-body m-auto ">
                  <FaHandSparkles
                    color="lightblue"
                    className="text-8xl m-auto"
                  />
                  <div className="title text-center">Fast & Easy Access</div>
                  <div className="overlay-choose text-center absolute  text-[10px]  h-0 transition-ease duration-5000 ">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Sequi, a!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choose;
