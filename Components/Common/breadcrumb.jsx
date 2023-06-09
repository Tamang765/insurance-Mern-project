import Image from "next/image";
import { Breadcrumb } from "react-bootstrap";

const BreadCrumbSection = ({ item, source, activeitem }) => {
  return (
    <div className="flex">
      <div className="right-img">
        {/* <img
          src="/media/header/leftside.jpg"
          style={{ width: "15rem", height: "40vh" }}
          className="object-cover"
        /> */}
      </div>
      <div className="about-page-img-holder relative">
        <Image src="/media/about.jpg" width={1700} height={100} className="object-cover" />

          
        <div className="breadcrumb  ">
        <center className="m-auto translate-y-[-14rem] text-[22px] breadcrumb-name">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home </Breadcrumb.Item>
            {source && (
              <Breadcrumb.Item href={`/${source}`}>{source} </Breadcrumb.Item>
            )}
            <Breadcrumb.Item active className="text-white"> {activeitem}</Breadcrumb.Item>
          </Breadcrumb>
</center>
        </div>

      </div>
    </div>
  );
};

export default BreadCrumbSection;
