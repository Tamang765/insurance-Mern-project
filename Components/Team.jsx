import { teamData } from "@/Data/Data";
import Image from "next/image";
import Title from "./Common/Title";
import { AiOutlineShareAlt } from "react-icons/ai";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import Socialmedia from "./Common/Socialmedia";
import { useEffect } from "react";
import { getAllTestimonial } from "@/redux/slice/TestimonialSlice";
import { getAllTeams } from "@/redux/slice/TeamSlice";
import { useDispatch, useSelector } from "react-redux";

const Team = () => {
  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.team)
  useEffect(() => { 
    dispatch(getAllTeams())
  }, [dispatch])
  return (
    <div className="team container-fluid my-20">
      <div className="container ">
        <center className="my-[5rem]">
          <Title title="Our Experts" />
          <h2 className="text-5xl font-semibold mt-4">
            Meet our experienced <br /> team people
          </h2>
        </center>
        <div className="row w-[85%] justify-center m-auto gap-[5rem] my-5">
          {teams?.map((teams) => (
            <div
              className="team-card relative col-lg-3 col-md-6 col-sm-12  p-0"
              key={teams._id}
            >
              <Link href={`team/${teams.name.toLowerCase()}`}>
                <div className=" team-img  m-auto shadow-md relative bg-white rounded-[20px]">
                  <img
                    src={teams.image.filePath}
                    width={350}
                    className="rounded-[20px] object-cover w-full"
                    style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}
                  />
                  <div className="team-info absolute bottom-[-9px] right-[10px] bg-blue-300 rounded-lg p-3 z-80">
                    <Socialmedia color="white"/>
                    <AiOutlineShareAlt color="white" className="text-3xl" />
                  </div>
                </div>
                <div className="team-position grid bg-white mt-4">
                  <span className="text-blue-500 font-semibold">
                    {teams.post}
                  </span>
                  <span className="font-semibold">{teams.name}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <center>
          <p className="font-regular border-2 w-fit px-10 py-3 border-dashed rounded-[20px] border-sky-500">
            Contact Our Expert Team Member To Take Our{" "}
            <span className="text-blue-500 font-semibold">Best Policies</span>{" "}
          </p>
        </center>
      </div>
    </div>
  );
};

export default Team;
