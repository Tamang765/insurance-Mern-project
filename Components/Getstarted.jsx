import Image from "next/image";
import Title from "./Common/Title";
import { Col, Form, FormCheck, FormControl, FormGroup } from "react-bootstrap";
import { useState } from "react";
import "aos/dist/aos.css";
import RangeSlider from "react-bootstrap-range-slider";
import Link from "next/link";
const Getstarted = () => {
  const [value, setValue] = useState(25);
  return (
    <div className="getStarted bg-bgStarted container-fluid pt-5 relative p-0 bg-cover ">
      {/* <img
        src="/media/getstarted/bg.jpg"
        className="w-full opacity-20 h-[105vh]"
      /> */}
      <div className="container  top-0 z-10" style={{ position: "inherit" }}>
        <div className="row getStarted-section w-10/12 m-auto">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="flex" >
              {/* <p className="text-2xl m-auto" style={{ fontFamily: "Caveat" }}>
                Suraz Thapaliya
              </p> */}
              <Image
                src="/media/getstarted/aleesha.jpg"
                width={550}
                height={50}
                className="object-cover pt-5"
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="grid pr-20 insurance-quote ">
              <Title title="get a free estimate" />
              <h1 className="text-5xl font-semibold">
                Get an insurance quote to get started!
              </h1>
              <div className="btns gap-3 flex my-5">
                <div className="btn bg-customCard text-white hover:bg-blue-500">
                  Home
                </div>
                <div className="btn bg-customCard text-white hover:bg-blue-500">
                  Health
                </div>
                <div className="btn bg-customCard text-white hover:bg-blue-500">
                  Vehicle
                </div>
                <div className="btn bg-customCard text-white hover:bg-blue-500">
                  Life
                </div>
              </div>
              <FormGroup className="grid gap-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="shadow-lg pl-3 pr-[7rem] py-3 outline-none rounded-md"
                />
                <input
                  type="name"
                  placeholder="Full Name"
                  className="shadow-lg pl-3 pr-[7rem] py-3 outline-none rounded-md"
                />
                <Form.Group className="mb-3 outline-none">
                  <Form.Select className="p-[15px]">
                    <option>Home Insurance</option>
                    <option>Land Insurance</option>
                    <option>Pet Insurance</option>
                  </Form.Select>
                </Form.Group>

                <Form>
                  <div className="label flex justify-between">
                    <span>Limits of balances:</span>
                    <FormControl
                      value={`$ ${value}`}
                      className="border-0 bg-transparent w-fit"
                    />
                  </div>
                  <RangeSlider
                    max={2000}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <div className="btn-section flex justify-between gap-6 mt-10">
                    <Link
                      href="/contact"
                      className="w-fit rounded-md p-3 flex justify-center items-center text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-yellow-500 ..."
                    >
                      Get to know
                    </Link>
                  </div>
                </Form>
              </FormGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Getstarted;
