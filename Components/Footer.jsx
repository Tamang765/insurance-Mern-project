import Image from "next/image";
import { MdMail, MdLocationOn } from "react-icons/md";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { BsFillSendFill, BsFillTelephoneOutboundFill } from "react-icons/bs";
import Link from "next/link";
import { AiFillPhone } from "react-icons/ai";
const Footer = () => {
  return (
    <div className="footer container-fluid  relative py-5 bg-footer">
      <div
        className="footer-section container z-20 w-10/12"
        style={{ position: "inherit" }}
      >
        <div className="row text-white items-center pb-4 ">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <Image src="/media/logofooter.jpg" width={200} height={200} />
            <div className="grid pt-4">
              <small>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Corporis assumenda ratione atque ullam facere nisi modi esse
                obcaecati beatae temporibus.
              </small>
              <div className="social-icon gap-3 flex py-4">
                <span className="border-2 p-[5px] border-blue-500 rounded-[10px] flex items-center">
                  <Link href="https://twitter.com">
                    <FaTwitter className="text-md" />
                  </Link>
                </span>
                <span className="border-2 p-[5px] border-blue-500 rounded-[10px] flex items-center">
                  <Link href="https://facebook.com">
                    <FaFacebook className="text-md" />
                  </Link>
                </span>
                <span className="border-2 p-[5px] border-blue-500 rounded-[10px] flex items-center hover:bg-pink-300 hover:border-pink-300">
                  <Link href="https://instagram.com">
                    <FaInstagram className="text-md " />
                  </Link>
                </span>
                <span className="border-2 p-[5px] border-blue-500 rounded-[10px] flex items-center">
                  <Link href="https://linkedin.com">
                    <FaLinkedin className="text-md" />
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 grid contact-num justify-end">
            <span>Contact</span>
            <div className="grid pt-4">
              <small className="flex items-center gap-3">
                <AiFillPhone />
                <Link href="tel:+97218312312">+978123123</Link>
              </small>
              <small className="flex items-center gap-3">
                <MdMail />
                <Link href="mailto:info@gmail.com">info@gmail.com</Link>
              </small>
              <small className="flex items-center gap-3">
                <MdLocationOn />
                <span>30 Commercial Road Fratton, Australia</span>
              </small>
            </div>
            <span className="pt-4">Open Hour</span>
            <small className="pt-4">
              Mon – Sat: 8:00 am to 6:00 pm Sunday: Closed
            </small>
          </div>
          {/* <div className="col-lg-3 col-md-6 col-sm-12">
            <h2>Gallery</h2>
            <div className="row pt-4">
              <div className="col-lg-4 col-md-6 col-sm-12 rounded-xl">
                <img
                  src="/media/team/team1.jpg"
                  alt=""
                  style={{ width: "15rem", height: "12vh" }}
                  className="rounded-xl"
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 rounded-xl">
                <img
                  src="/media/team/team1.jpg"
                  alt=""
                  style={{ width: "15rem", height: "12vh" }}
                  className="rounded-xl"
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 rounded-xl">
                <img
                  src="/media/team/team1.jpg"
                  alt=""
                  style={{ width: "15rem", height: "12vh" }}
                  className="rounded-xl"
                />
              </div>
            </div>
          </div> */}
          {/* <div className="col-lg-4 col-md-12 col-sm-12">
            <h2>Newsletter</h2>
            <div className="grid ">
              <small>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolorum, cupiditate?
              </small>
              <div className="input pt-4 relative w-fit">
                <input
                  type="text"
                  placeholder="Email Address"
                  className="outline-none shadow-lg px-5 py-3 rounded-lg bg-black"
                />
                <div className="btn absolute right-5 top-[2rem]">
                  <BsFillSendFill className="text-lg" color="white" />
                </div>
              </div>
              <div className="flex items-center gap-3 ">
                <span className="p-2">
                  <BsFillTelephoneOutboundFill
                    className="fs-3"
                    color="powderblue"
                  />
                </span>
                <div className="flex flex-column gap-2 pt-3">
                  <strong>+987654123123</strong>
                  <small>Contact us</small>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <hr style={{ color: "white" }} />
        <center className="text-white">
          <br />
          <small>
            © All Copyright 2023 by{" "}
            <Link href="https://apptechnologies.co/">APP Technologies</Link>{" "}
          </small>
        </center>
      </div>
    </div>
  );
};

export default Footer;
