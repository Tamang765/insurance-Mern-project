import { blogData } from "@/Data/Data";
import Link from "next/link";
import { Button, Card } from "react-bootstrap";
import { AiFillFolder, AiFillWechat, AiOutlineCalendar } from "react-icons/ai";
import { BiChat, BiChevronsRight } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import Slider from "react-slick";
import Blogcard from "./Common/blogcard";
import Title from "./Common/Title";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "@/redux/slice/blogSlice";
import { useEffect } from "react";
const Blog = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blog)
  useEffect(() => { 
    dispatch(getAllBlogs())
  }, [dispatch])
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
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
  return (
    <div className="blog container-fluid">
      <div className="container blog-section w-10/12">
        <center className="my-[5rem]">
          <Title title="recent news feed" />
          <h1 className="text-4xl font-semibold">
            Latest news & articles from the blog
          </h1>
        </center>
        <div className="row">
          <Slider {...settings}>
            {blogs.slice(0, 3).map((blogs) => (
              <div className="blog-card mt-3 rounded-[15px] m-auto" key={blogs._id}>
                <Blogcard
                  image={blogs.image.filePath}
                  title={blogs.title}
                  description={blogs.description}
                  link={blogs.title.toLowerCase()}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Blog;
