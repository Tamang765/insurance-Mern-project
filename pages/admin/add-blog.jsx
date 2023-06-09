import { ButtonDesign, Heading, TitleSection } from "@/Components/Common/design";
import BlogList from "@/Components/admin/BlogList";
import { useRedirect } from "@/Components/redirector/useRedirect";
import AdminLayout from "@/layout/AdminLayout";
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
  title: "",
};
const AddBlog = () => {
  useRedirect("/login");
  const dispatch = useDispatch();
  const router = useRouter();
  const [blog, setBlog] = useState(initialState);
  const [imagePreview, setImagePreview] = useState(null);
  const [contentPreview, setContentPreview] = useState("");
  const [description, setDescription] = useState("");
  const { title } = blog;


  const handleImg = (e) => {
    setContentPreview(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((blog) => ({ ...blog, [name]: value }));
    console.log(blog);
  };

  //create blog
  const submitBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", contentPreview);
    formData.append("description", description);
    console.log(formData.get("title"));
    await dispatch(createBlog(formData));
    await dispatch(getAllBlogs());
    setBlog({ ...formData, initialState, description: "" })
  };

  return (
    <AdminLayout>
      <div className="add-service p-12">
        <TitleSection>Create New Blog</TitleSection>
        <form onSubmit={submitBlog}>
          <div className="form-group">
            <Heading>Title</Heading>
            <input
              type="text"
              placeholder="Please give titile to blog"
              name="title"
              value={blog?.title}
              className="border-2 p-2 rounded-md w-5/12 outline-none"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <Heading>Description</Heading>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              placeholder="write title"
              modules={AddBlog.modules}
              formats={AddBlog.formats}
              className="h-[20vh]"
            />
          </div>
          <br />
          <br />
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
            "no blog image to show"
          )}
          </div>
          <ButtonDesign>Submit</ButtonDesign>
        </form>
        <br />
        <br />
        <center><span className="text-4xl   mt-4">Blog List</span></center>
        <BlogList/>
      </div>
    </AdminLayout>
  );
};
AddBlog.modules = {
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
AddBlog.formats = [
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

export default AddBlog;
