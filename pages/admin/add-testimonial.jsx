import { ButtonDesign, Heading, TitleSection } from "@/Components/Common/design";
import BlogList from "@/Components/admin/BlogList";
import TestimonialList from "@/Components/admin/TestimonialList";
import { useRedirect } from "@/Components/redirector/useRedirect";
import AdminLayout from "@/layout/AdminLayout";
import { createTestimonial, getAllTestimonial } from "@/redux/slice/TestimonialSlice";
import { createBlog, getAllBlogs } from "@/redux/slice/blogSlice";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import {  useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
const initialState = {
  name: "",
  post: "",
  message:""
};
const AddTestimonial = () => {
  useRedirect("/login");
  const dispatch = useDispatch();
  const router = useRouter();
  const [testimonial, setTestimonial] = useState(initialState);
  const [imagePreview, setImagePreview] = useState(null);
  const [contentPreview, setContentPreview] = useState("");
  const { name, post, message } = testimonial;


  const handleImg = (e) => {
    setContentPreview(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestimonial((testimonial) => ({ ...testimonial, [name]: value }));
    console.log(testimonial);
  };

  //create blog
  const submitTestimonial = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("post", post);
    formData.append("message", message);
    formData.append("image", contentPreview);
    await dispatch(createTestimonial(formData));
    await dispatch(getAllTestimonial());
    setTestimonial({ ...formData, initialState })
  };
  return (
    <AdminLayout>
      <div className="add-service p-12">
        <TitleSection>Create New Testimonial</TitleSection>
        <form onSubmit={submitTestimonial}>
          <div className="form-group">
            <Heading>Name</Heading>
            <input
              type="text"
              placeholder="Please give client name"
              name="name"
              value={name}
              className="border-2 p-2 rounded-md"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <Heading>Post</Heading>
            <input
              type="text"
              placeholder="Please give post "
              name="post"
              value={post}
              className="border-2 p-2 rounded-md"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <Heading>Message</Heading>
            <input
              type="text"
              placeholder="Please give message"
              name="message"
              value={message}
              className="border-2 p-2 rounded-md"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <Heading>Image</Heading>
            <input
              type="file"
              alt="service-img"
              onChange={(e) => handleImg(e)}
            />
          {imagePreview !==null  ? (
            <Image src={imagePreview} width={200} height={100} />
          ) : (
            "no testimonial image to show"
          )}
          </div>
          <br />
          <ButtonDesign>Submit</ButtonDesign>
        </form>
        <br />
        <br />
        <center><span className="text-5xl font-semibold underline  mt-4">Testimonial List</span> </center>
        <TestimonialList/>
      </div>
    </AdminLayout>
  );
};
AddTestimonial.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
AddTestimonial.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default AddTestimonial;
