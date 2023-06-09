import BreadCrumbSection from "@/Components/Common/breadcrumb";
import Service from "@/Components/Service";
import Track from "@/Components/Track";
import Layout from "@/layout/Layout";
import Image from "next/image";
import { Breadcrumb } from "react-bootstrap";

const services = () => {
  return (
    <Layout>
      <div className="services container-fluid p-0">
        <div className="container p-0">
          <BreadCrumbSection activeitem="service" />
        </div>
        <Service />
        <Track />
      </div>
    </Layout>
  );
};

export default services;
