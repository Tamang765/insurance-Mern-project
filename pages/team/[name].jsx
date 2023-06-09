import Contactform from "@/Components/Common/Contactform";
import BreadCrumbSection from "@/Components/Common/breadcrumb";
import { teamData } from "@/Data/Data";
import Layout from "@/layout/Layout";
import ProgressBar from "@ramonak/react-progress-bar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Breadcrumb } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const TeamDetail = () => {
  const router = useRouter();
  const { name } = router.query;
  const item = teamData.filter((item) => item.name.toLowerCase() === name);

  return (
    <Layout>
    <div className="team-detail container-fluid p-0">
      <div className="container ">
        <BreadCrumbSection source="team" activeitem={name} />
        {item.map((teams) => (
          <div className="row m-auto py-[7rem] team-detail-section w-10/12" key={teams.id}>
            <div className="col-md-6 col-lg-6 col-sm-12">
              <div className="imgs-holder relative ">
                <Image
                  src={teams.img}
                  className="rounded-[20px]"
                  width={450}
                  height={40}
                  style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}
                />{" "}
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-sm-12">
              <div className="text-holder w-full h-full p-[2rem] bg-white rounded-[20px]">
                <div className="title grid gap-4">
                  <h2 className="font-semibold text-5xl">{teams.position}</h2>
                  <div className="team-info h-[5vh] ">
                    <div className="social-media-icon flex gap-[10px] items-center ">
                      <Link
                        href="https:/facebook.com"
                        className="rounded-[10px] p-1 border-2 border-blue-400"
                      >
                        <FaFacebook color="lightblue" className="text-2xl" />
                      </Link>
                      <Link
                        href="https:/twitter.com"
                        className="rounded-[10px] p-1 border-2 border-blue-400"
                      >
                        <FaTwitter color="lightblue" className="text-2xl" />
                      </Link>
                      <Link
                        href="https:/linkedin.com"
                        className="rounded-[10px] p-1 border-2 border-blue-400"
                      >
                        <FaLinkedin color="lightblue" className="text-2xl" />
                      </Link>
                      <Link
                        href="https:/instagram.com"
                        className="rounded-[10px] p-1 border-2 border-blue-400"
                      >
                        <FaInstagram color="lightblue" className="text-2xl" />
                      </Link>
                    </div>
                  </div>
                  <h3 className="font-medium text-2xl text-blue-600">
                    {teams.name}
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quaerat iste fugiat quo autem ipsam cum voluptatem quasi non
                    rerum tempora? Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit. Doloribus, ipsum! Lorem, ipsum dolor sit
                    amet consectetur adipisicing elit. Voluptate amet suscipit
                    consectetur dolores nihil fugit sapiente, velit consequuntur
                    ullam nam ducimus ab sit voluptates ea exercitationem
                    placeat totam. Facilis, voluptate?
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <hr className="p-0" />
        <div className="row team-detail-section  m-auto py-5 w-10/12">
          <div className="col-lg-6 col-sm-12">
            <h2 className="font-semibold">
              Trusted and funded by more then 800 companies
            </h2>
            <br />
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi ab
              sapiente voluptates rerum provident est, ducimus eius dolores
              autem minima.
            </span>
          </div>
          <div className="col-lg-6 col-sm-12">
            <div className="grid gap-3">
              <b>Cleaning</b>
              <ProgressBar
                completed={90}
                bgColor="#1bb8cf"
                labelColor="#ebebeb"
                animateOnRender
              />
              <b>Cleaning</b>
              <ProgressBar
                completed={60}
                bgColor="#1bb8cf"
                labelColor="#ebebeb"
                animateOnRender
              />
              <b>Cleaning</b>
              <ProgressBar
                completed={46}
                bgColor="#1bb8cf"
                labelColor="#ebebeb"
                animateOnRender
              />
            </div>
          </div>
        </div>
      </div>
      <div className="contact-section relative p-0 bg-blue-100">
        <div className="background-images bg-bgContact w-full h-1/4 absolute left-0 opacity-20"></div>
        <div className="background-images1 bg-bgContact1 w-full h-3/4 bottom-0 absolute left-0 opacity-10"></div>
        <Contactform />
      </div>
    </div>
    </Layout>
  );
};

export default TeamDetail;
