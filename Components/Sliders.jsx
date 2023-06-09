import { sliderData } from "@/Data/Data";
import Image from "next/image";
import Slider from "react-slick";
import CustomButton from "./Common/button";

const Sliders = () => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <div className="slider-section container-fluid  p-0">
      <Slider {...settings}>
        {sliderData.map((item) => (
          <>
            <div key={item.id} className="slider-content d-flex relative ">
              {/* <div className="left-content w-2/12 m-auto ">
              </div> */}
              <div className="right-content w-full relative">
                <div className="absolute z-10  m-auto top-20 w-1/3 left-28 slider-detail">
                  <div className="w-75 bg-gradient-to-r from-blue-500 h-3 rounded-md"></div>
                  <h1
                    className="text-6xl leading-normal font-medium text-start"
                    data-aos="fade-down"
                    data-aos-duration="3000"
                  >
                    {item.heading} <span className="text-blue-700">Life.</span>
                  </h1>
                  <br />
                  <div data-aos="fade-up" data-aos-duration="3000">
                    <span>{item.text}</span>
                    <br />
                    <br />
                    <CustomButton title="Let's Get Started" link="" />
                  </div>
                </div>
                <Image
                  src={item.img}
                  width={1700}
                  height={100}
                  className="object-cover slider-img h-[85vh]"
                  data-aos="zoom-in"
                  data-aos-duration="3000"
                />
              </div>
            </div>
          </>
        ))}
      </Slider>
    </div>
  );
};

export default Sliders;
