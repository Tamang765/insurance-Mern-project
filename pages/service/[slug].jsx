import BreadCrumbSection from "@/Components/Common/breadcrumb";
import CustomButton from "@/Components/Common/button";
import { Loader } from "@/Components/Loader";
import Track from "@/Components/Track";
import { serviceData } from "@/Data/Data";
import Layout from "@/layout/Layout";
import { getAllService, getService, selectOneservice, selectServices } from "@/redux/slice/serviceSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { AiOutlineArrowRight, AiOutlineLeft } from "react-icons/ai";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { FcCheckmark } from "react-icons/fc";
import { GiHandOk } from "react-icons/gi";
import { TbPhoneCall } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

const ServicesPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { slug } = router.query;
  const oneService = useSelector(selectOneservice)
  const services = useSelector(selectServices)
  const isLoading = useSelector((state)=>state.service.isLoading)
  console.log(services);
  const otherServices = serviceData.filter(
    (item) => item.heading.toLowerCase() !== slug
  );
  const service = serviceData.filter(
    (item) => item.heading.toLowerCase() === slug
  );
  useEffect(() => {
    async function fetchService() {
    if (slug) {
        await dispatch(getService(slug));
      }
    }
    async function fetchAllServices() { 
      dispatch(getAllService())
    }

    Promise.all([fetchService(), fetchAllServices()]).then(() => { 
      dispatch ({type:'service/setIsLoading', payload:false})
    })
    }, [dispatch, slug]);
  return (
    <Layout>
    <div className="ServicesPage container-fluid p-0">
      <div className="container p-0">
        <BreadCrumbSection source="service" activeitem={slug} />
        <div className="services-page-holder  ">
{   isLoading? <Loader/> :      <div className="row service-detail-page w-10/12 m-auto py-[6rem]">
            <div className="col-lg-4 col-sm-12">
              <div className="grid shadow-2xl rounded-[20px]">
                {services.map((services) => (
                  <div className="shadow-sm p-[15px] rounded-[10px] m-2">
                    <Link href={`/service/${services.slug}`}>
                      <div
                        key={services._id}
                        className="flex items-center justify-between"
                      >
                        {services.title} <AiOutlineArrowRight />{" "}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              <br />
              <br />
              <h2 className="font-semibold">Download Resources</h2>
              <div className="flex justify-between my-3">
                <div className="card p-3">
                  <div className="grid m-auto gap-2">
                    <div className="icon-holder p-2 bg-blue-500 rounded-full m-auto">
                      <BsFileEarmarkPdf color="white" className="text-3xl" />
                    </div>
                    <span className="text-gray-400 text-center">3.2kb</span>
                    <h3>Travel plan & Policy</h3>
                    <button className="bg-blue-500 rounded-2xl p-2 text-white">
                      Download
                    </button>
                  </div>
                </div>
                <div className="card p-3">
                  <div className="grid m-auto gap-2">
                    <div className="icon-holder p-2 bg-blue-500 rounded-full m-auto ">
                      <BsFileEarmarkPdf color="white" className="text-3xl" />
                    </div>
                    <span className="text-gray-400 text-center">3.2kb</span>
                    <h3>Travel plan & Policy</h3>
                    <button className="bg-blue-500 rounded-2xl p-2 text-white">
                      Download
                    </button>
                  </div>
                </div>
              </div>
              <div className="card  bg-bgcontactcard bg-cover w-full p-4 text-white before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-blue-800 before:opacity-30">
                <div className="grid m-auto gap-4 relative">
                  <div className="icon-holder p-2 bg-blue-500 rounded-full m-auto">
                    <TbPhoneCall color="white" className="text-7xl" />
                  </div>
                  <h3 className="text-3xl font-semibold px-3 text-center">
                    Talk to our insurance agent
                  </h3>
                  <div className="grid justify-center">
                    <span>+0987654323456</span>
                    <span>Call Our Experts</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-sm-12">
              <div className="grid my-3">
    
                  <div>
                    {oneService?.image ?(
                      <img
                      src={oneService?.image.filePath}
                      style={{ width: "42rem" }}
                      className="m-auto rounded-[20px] shadow-2xl"
                    />):""}
                  </div>

              </div>
              <div className="row my-[4rem]">
                <div className="col-lg-6 col-sm-12">
                  <div className="img-holder relative my-[2rem]">
                    <img
                      src="/media/service/services1.jpg"
                      alt="insurance"
                      className="w-full rounded-lg shadow-lg"
                    />
                    <span className="absolute w-full bottom-0 text-center bg-blue-600 text-white p-4 rounded-b-lg">
                      Hope for the Best, Prepare for the Worst
                    </span>
                  </div>
                  <span className="my-3">
                      {oneService?.title}
                    </span>
                    <p>{ oneService?.description}</p>
                  <br />
                </div>
                <div className="col-lg-6 col-sm-12 my-[2rem]">
                  <b className="text-3xl ">Main Features</b>
                  <br />
                  <p>
                    There are many variations of passages of available but the
                    majority have suffered alteration in some form, by injected
                    hum randomised words which don't slightly.
                  </p>
                  <ul className="mt-4">
                    <li className="flex items-center gap-2">
                      <div className="bg-blue-300 rounded-full p-3 w-fit">
                        <FcCheckmark />{" "}
                      </div>{" "}
                      <span> International Plans</span>
                    </li>
                  </ul>
                  <br />
                </div>
              </div>
              <div className="card rounded-3xl">
                <div className="flex items-center p-4 gap-3">
                  <GiHandOk className="text-8xl" color="aqua" />
                  <span className="">Fast & Easy Process</span>
                  <span className="w-[2px] bg-gray-400 h-[10vh]"></span>
                  <p>
                    There are many not of age of dirm available the simply free
                    text available in the market today you can use them
                    majority.
                  </p>
                </div>
              </div>
              <div className="talk-to-expert my-9">
                <strong>Talk to our insurance experts</strong>
                <br />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                  veniam aliquid commodi suscipit mollitia? Architecto illo
                  aspernatur iusto. Magnam, aspernatur?
                </p>
                <div className="flex gap-5 my-3 flex-wrap">
                  <input
                    type="text"
                    placeholder="Your Phone Number"
                    className="p-3 shadow-lg rounded-2xl outline-none"
                  />
                  <CustomButton title="Get A Call" />
                </div>
              </div>
            </div>
          </div>}
          <Track />
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default ServicesPage;
