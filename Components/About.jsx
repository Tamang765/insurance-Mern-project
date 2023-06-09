import Image from "next/image";
import Link from "next/link";
import { AiFillPhone } from "react-icons/ai";

import CustomButton from "./Common/button";
import Title from "./Common/Title";

const About = () => {
  return (
    <div className="about container-fluid my-[9rem] pt-5">
      <div className="container">
        <div className="row about-section w-10/12 m-auto">
          <div className="col-md-12 col-lg-6 col-sm-12">
            <div className="img-holder relative before:absolute before:top-8 before:left-0 before:rounded-[20px] before:opacity-40 before:w-full before:h-4/5 before:bg-aboutleft  before:object-cover before:z-[-1]" >
              <Image
                src="/media/about/about1.jpg"
                className="rounded-[20px]"
                width={550}
                height={50}
                style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}
              />{" "}
              <div className="experience absolute flex items-center gap-2 bg-blue-500 p-4 z-20 text-white rounded-lg top-[27rem] left-[11rem]">
                <span className="text-6xl font-bold">10</span>{" "}
                <span className="w-[6rem]">Years Of Experience</span>{" "}
              </div>
              <div className="side-image absolute left-[-5rem] top-[17rem]">
                <Image
                  src="/media/about/about2.jpg"
                  className="rounded-[20px]"
                  width={360}
                  height={15}
                  style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}
                />
              </div>
            </div>
          </div>
          <br />
          <div className="col-md-12 col-lg-6 col-sm-12">
            <div className="text-holder w-full h-full px-[2rem] bg-white rounded-[20px]">
              <div className="title grid gap-4">
                <Title title="about company" />
                <h2 className=" text-5xl font-semibold ">
                  We provide the best insurance policy
                </h2>
                <h3 className="font-medium text-normal text-blue-600">
                
                </h3>
                <ul className="list-disc">
                  <li className="font-medium">
                    Laboris non dolor enim veniam id sit sit id culpa Lorem quis
                    consectetur.
                  </li>
                  <li className="font-medium">
                    Laboris non dolor enim veniam id sit sit id culpa Lorem quis
                    consectetur.
                  </li>
                  <li className="font-medium">
                    Laboris non dolor enim veniam id sit sit id culpa Lorem quis
                    consectetur.
                  </li>
                </ul>
                <span className="text-gray-400 font-medium">
                Adipisicing laboris proident ullamco voluptate est Duis aute
                  irure dolor in reprehenderit in velit esse cillum dolore eu
                  nulla pariatur.
                  Sunt ex veniam amet excepteur enim excepteur consequat dolore
                  non consectetur aliquip commodo reprehenderit duis. .
                </span>
                <div className="btn-section flex justify-between gap-6">
                  <CustomButton title="Discover More" link="about" />
                  <div className="flex items-center gap-3 w-50">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
