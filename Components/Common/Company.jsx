import { companyData } from "@/Data/Data";
import Image from "next/image";
import Slider from "react-slick";

const Company = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="company container-fluid">
      <div className="row">
        <Slider {...settings}>
          {companyData.map((items) => (
            <div className="" key={items.id}>
              <Image
                src={items.image}
                width={150}
                height={80}
                className="company-img m-auto opacity-30"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Company;
