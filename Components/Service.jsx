import Image from "next/image";
import Title from "./Common/Title";
import { Card } from "react-bootstrap";
import { serviceData } from "@/Data/Data";
import { AiFillAlert } from "react-icons/ai";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getAllService } from "@/redux/slice/serviceSlice";
import { useEffect } from "react";
import DOMPurify from "dompurify";

const Service = () => {
  const dispatch = useDispatch();
  const {services} = useSelector((state)=>state.service)
  useEffect(() => { 
    dispatch(getAllService())
  }, [dispatch])
  console.log(services);
  return (
    <div className="service container-fluid  p-0 bg-gray-100">
      <div className="service-section container w-10/12 py-[7rem]">
        <Title title="our Services" />
        <div className="row pt-3 items-center ">
          <h2 className="col-lg-6  col-sm-12 text-5xl font-semibold py-3  ">
            We’re covering all the insurance fields
          </h2>
          <p className="text-gray-500 col-lg-6 col-sm-12">
            Duis est magna amet occaecat. Reprehenderit nostrud adipisicing
            excepteur et occaecat occaecat reprehenderit. Sunt ex adipisicing{" "}
          </p>
        </div>
        <div className="row my-4">
          {services?.map((item) => (
            <div
              className="col-lg-3 col-md-6 col-sm-12 mt-3 rounded-lg"
              key={item._id}
            >
              <Link href={`service/${item.title.toLowerCase()}`}>
              <Card className="rounded-[15px] " style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                <div className="service-img-holder relative">
                  <img variant="top" src={item.image.filePath}  height={50} className="w-full rounded-t-[15px]" />
                  <div className="overlay absolute bottom-full w-full left-0 right-0 h-0 "></div>
                  <div className="square-box  absolute bottom-[-10px] right-2 p-[1rem] bg-white shadow-md rounded-md">
                    <AiFillAlert className="service-icon fs-2" color="blue" />
                  </div>
                </div>
                <Card.Body>
                  <div className="w-25 bg-gradient-to-r from-blue-500 h-1 my-2"></div>
                  <Card.Title>{item.title}</Card.Title>
                  <small  dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item.description)
                }} ></small>
                </Card.Body>
              </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Service;
