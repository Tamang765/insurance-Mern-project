import { AiFillStar } from "react-icons/ai";
import Title from "./Title";
import Image from "next/image";
import Slider from "react-slick";
import { testimonialData } from "@/Data/Data";
import Tick from "./tick";
import { useDispatch, useSelector } from "react-redux";
import { getAllTestimonial } from "@/redux/slice/TestimonialSlice";
import { useEffect } from "react";

const TestimonialPart = () => {
  const dispatch = useDispatch();
  const { testimonial } = useSelector((state) => state.testimonial)
  const settings = {
    className: "center",
    centerMode: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    arrows: false,

  };

  useEffect(() => { 
    dispatch(getAllTestimonial())
  }, [dispatch])
  return (
    <div className="testimonial-part container-fluid p-0 bg-gray-100 relative before:absolute before:top-0 before:w-full before:h-full before:bg-bgTestimonial">
      <div
        className="container testimonial-section w-10/12 py-32"
        style={{ position: "inherit", zIndex: "30" }}
      >
        <div className="row">
          <div className="col-lg-6 pr-24 detail-testimonial">
            <Title title="Testimonial" />
            <h2 className="font-semibold text-4xl leading-[3rem]">
              What our happy customers are talking about our insurance company
            </h2>
            <br />
            <br />
            <p className="text-gray-400 leading-8">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
              iste fugiat quo autem ipsam cum voluptatem quasi non rerum
              tempora? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
            <div className="row">
              <Tick />
            </div>
          </div>
          <div className="col-lg-6">
            <Slider {...settings}>
              {testimonial?.map((testimonial) => (
                <div className="col-lg-5 mt-3 " key={testimonial._id}>
                  <div className="card testimonialCard-about rounded-3xl">
                    <div className="name-rating flex items-start justify-between p-[2rem]">
                      <div className="grid">
                        <b className="name">{testimonial.name}</b>
                        <p className="text-gray-700 mt-2">
                          {testimonial.message}
                        </p>
                      </div>
                      <div className="rating flex">
                        <AiFillStar color="orange" />
                        <AiFillStar color="orange" />
                        <AiFillStar color="orange" />
                        <AiFillStar color="orange" />
                        <AiFillStar color="orange" />
                      </div>
                    </div>
                    <div className="flex justify-end relative">
                      <div className="img-holder-testimonial absolute rounded-full bg-white p-[1rem] right-4 top-[-3rem]">
                        <Image
                          src={testimonial.image.filePath}
                          width={80}
                          height={80}
                          className="rounded-full"
                        />
                      </div>
                      <div className="bg-blue-600 text-left text-white p-7 w-full rounded-b-3xl">
                        {testimonial.post}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialPart;
