import DOMPurify from "dompurify";
import Link from "next/link";
import React from "react";
import { Card } from "react-bootstrap";
import { AiFillFolder, AiOutlineCalendar } from "react-icons/ai";
import { BiChat, BiChevronsRight } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

const Blogcard = ({ image, description, title, link }) => {
  return (
    <Card className="rounded-2xl blog-card w-11/12" >
      <div className="blog-img-holder relative overflow-hidden">
        <img variant="top" src={image}  className="w-100 object-cover rounded-t-2xl" />
        <Link href={`blog/${link}`}>
          <div className="overlay absolute bottom-full w-full left-0 right-0 h-0 rounded-t-2xl"></div>
          <div className="overlay-arrow absolute left-[50%] ">
            <BsArrowRight className="fs-2" color="white" />
          </div>
        </Link>
        <div className="square-box  absolute flex items-center gap-3 bottom-[-10px] right-2 p-[1rem] bg-white  rounded-t-2xl">
          <AiFillFolder className="service-icon fs-6" color="blue" />{" "}
          <span>Insurance</span>{" "}
        </div>
      </div>
      <Card.Body>
        <div className="flex justify-between items-center mt-3 mb-4">
          <span className="flex gap-2 items-center">
            <AiOutlineCalendar color="blue" />
            <small>june 10,20</small>{" "}
          </span>{" "}
          <span className="flex gap-2 items-center">
            <BiChat color="blue" />
            <small>2 Comments</small>{" "}
          </span>
        </div>
        <Card.Title className="text-2xl font-semibold">{title}</Card.Title>
        {/* <small dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(description)
        }}></small> */}
        <br />
        <br />
        <Link href={`blog/${link}`} className="font-semibold flex items-center">
          Read More <BiChevronsRight />
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Blogcard;
