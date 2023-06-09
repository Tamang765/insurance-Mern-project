import React, { useEffect } from "react";
import Title from "./Common/Title";
import Slider from "react-slick";
import { testimonialData } from "@/Data/Data";
import { AiFillStar } from "react-icons/ai";
import { getAllTestimonial } from "@/redux/slice/TestimonialSlice";
import { useDispatch, useSelector } from "react-redux";

const Testimonial = () => {
  const dispatch = useDispatch();
  const { testimonial } = useSelector((state) => state.testimonial)
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    // autoplay: true,
    speed: 500,
    // autoplay: 1000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
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

  useEffect(() => { 
    dispatch(getAllTestimonial())
  }, [dispatch])
  return (
    <div className="testimonial container-fluid relative py-16 bg-gray-100">
      <div className="container testimonial-section w-10/12 z-20" style={{ position: "inherit" }}>
        <Title title="Testimonial" />
        <div className="row pt-3 items-center ">
          <h1 className="col-lg-6  col-sm-12 text-4xl font-semibold">
            What our customers are talking about
          </h1>
          <p className="text-gray-500 col-lg-6 col-sm-12">
            Duis est magna amet occaecat. Reprehenderit nostrud adipisicing
            excepteur et occaecat occaecat reprehenderit. Sunt ex adipisicing{" "}
          </p>
        </div>
        <div className="row my-5">
          <Slider {...settings}>
            {testimonial?.map((testimonial) => (   
              <div
                className=" testimonial-card relative   rounded-[20px]  bg-white"
                key={testimonial._id}
                style={{ width: "90% !important" }}
                
              >
                <div className="absolute right-0">
                  <img
                    src="/media/testimonial/shape.jpg"
                    className="grayscale rounded-[20px] right-bg"
                  />
                </div>
                <div className=" p-4 m-4  rounded-lg ">
                  <div className="card-body">
                    <div className="flex gap-3">
                      <div className="testimonial-img relative">
                        <img
                          src={testimonial.image.filePath}
                          alt=""
                          className="rounded-tl-[20px]"
                        />
                        <div className="absolute rounded-full bg-white p-2 right-[-15px] top-[-8px]">
                          <img src="/media/testimonial/quote.jpg" alt="" />
                        </div>
                      </div>
                      <div className="person-info flex flex-col gap-0">
                        <span className="rating flex">
                          <AiFillStar color="orange" />
                          <AiFillStar color="orange" />
                          <AiFillStar color="orange" />
                          <AiFillStar color="orange" />
                          <AiFillStar color="orange" />
                        </span>
                        <span className="name">{testimonial.name}</span>
                        <span className="position">{testimonial.post}</span>
                      </div>
                    </div>
                    <p className=" pt-10 pb-2">{testimonial.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
