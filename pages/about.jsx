import Company from "@/Components/Common/Company";
import FindAgent from "@/Components/Common/FindAgent";
import Title from "@/Components/Common/Title";
import BreadCrumbSection from "@/Components/Common/breadcrumb";
import TestimonialPart from "@/Components/Common/testimonialPart";
import Counter from "@/Components/Counter";
import Footer from "@/Components/Footer";
import Team from "@/Components/Team";
import Layout from "@/layout/Layout";

import Image from "next/image";
import { Breadcrumb } from "react-bootstrap";

const about = () => {
  return (
    <>
      <Layout>
        <div className="container-fluid p-0">
          <div className="container p-0">

            <BreadCrumbSection activeitem="about" />

            <div className="row about-page m-auto py-[5rem] w-10/12">
              <div className="col-md-6 col-lg-6 col-sm-12">
                <div className="imgs-holder relative ">
                  <Image
                    src="/media/about/about1.jpg"
                    className="rounded-[20px]"
                    width={550}
                    height={50}
                  />{" "}
                  <div className="side-image absolute left-[15rem] top-[19rem]">
                    <Image
                      src="/media/about/about2.jpg"
                      className="rounded-[20px]"
                      width={360}
                      height={15}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-sm-12">
                <div className="text-holder w-full h-full p-[2rem] bg-white rounded-[20px]">
                  <div className="title grid gap-4">
                    <Title title="about company" />
                    <h2 className="font-semibold text-5xl">
                      We provide the best insurance policy
                    </h2>
                    <h3 className="font-medium text-2xl text-blue-600">
                      Adipisicing laboris proident ullamco voluptate est Duis
                      aute
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Quaerat iste fugiat quo autem ipsam cum voluptatem quasi
                      non rerum tempora? Lorem ipsum, dolor sit amet consectetur
                      adipisicing elit. Doloribus, ipsum! Lorem, ipsum dolor sit
                      amet consectetur adipisicing elit. Voluptate amet suscipit
                      consectetur dolores nihil fugit sapiente, velit
                      consequuntur ullam nam ducimus ab sit voluptates ea
                      exercitationem placeat totam. Facilis, voluptate?
                    </p>
                    <div className="flex items-center gap-3 w-50">
                      <span className="rounded-full border-2  border-blue-400">
                        <Image
                          src="/media/founder.jpg"
                          width={90}
                          height={90}
                          className="rounded-full"
                        />
                      </span>
                      <div className="flex flex-column">
                        <small>Suraz Thapaliya</small>
                        <small>Founder</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="p-0" />
            <div className="flex  items-center m-auto py-5 w-10/12">
              <div className="w-3/12">
                <span className="font-semi-bold">
                  Trusted and funded by more then 800 companies
                </span>
              </div>
              <div className="w-9/12">
                <Company />
              </div>
            </div>
          </div>
        </div>
        <TestimonialPart />
        <FindAgent />
        <Team />
        <Counter />
      </Layout>
    </>
  );
};

export default about;
