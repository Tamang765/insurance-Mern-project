import {
  ButtonDesign,
  Heading,
  TitleSection,
} from "@/Components/Common/design";
import BlogList from "@/Components/admin/BlogList";
import { useRedirect } from "@/Components/redirector/useRedirect";
import AdminLayout from "@/layout/AdminLayout";
import "react-quill/dist/quill.snow.css";
import {
  getAllBlogs,
  getBlogByID,
  selectoneBlog,
  updateBlog,
} from "@/redux/slice/blogSlice";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectOneABout, selectoneAbout } from "@/redux/slice/aboutSlice";
import { getAboutByID } from "@/redux/slice/aboutSlice";
import { getAllAbouts } from "@/redux/slice/aboutSlice";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const EditAbout = () => {
  useRedirect("/login");
  const dispatch = useDispatch();
  const router = useRouter();
    const { id } = router.query;
    const selectOneaBout= useSelector(selectOneABout)
  const [about, setAbout] = useState(selectOneaBout);
  const [imagePreview, setImagePreview] = useState(null);
  const [contentPreview, setContentPreview] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    dispatch(getAboutByID(id));
  }, [dispatch, id]);
  const handleImg = (e) => {
    setContentPreview(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAbout({ ...about, [name]: value });
  };
  const handleDescription = (value) => {
    setDescription(value);
  };
  const updateAbout = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", about?.title);
    formData.append("image", contentPreview);
    formData.append("description", description);
    console.log(formData);
    await dispatch(updateBlog({ id, formData }));
    await dispatch(getAboutByID());
    await dispatch(getAllAbouts());
    router.push("/admin/add-about");
  };
  useEffect(() => {
    setAbout(selectoneAbout);
    setImagePreview(
      selectoneAbout && selectoneAbout.image
        ? `${selectoneAbout.image.filePath}`
        : null
    );
    setDescription(
      selectoneAbout && selectoneAbout.description
        ? selectoneAbout.description
        : ""
    );
  }, [selectoneAbout]);
  return (
    <AdminLayout>
      <div className="edit-service p-12">
        <TitleSection>edit About</TitleSection>
        <form onSubmit={updateAbout}>
          <div className="form-group">
            <Heading>Title</Heading>
            <input
              type="text"
              placeholder="Please give titile to blog"
              name="title"
              value={about?.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <Heading>Description</Heading>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={handleDescription}
              placeholder="write title"
              modules={EditAbout.modules}
              formats={EditAbout.formats}
            />
          </div>
          <div className="form-group">
            <Heading>Image</Heading>
            <input
              type="file"
              alt="service-img"
              onChange={(e) => handleImg(e)}
            />
          </div>
          {imagePreview !== null ? (
            <Image src={imagePreview} width={500} height={100} />
          ) : (
            "no team image to show"
          )}
          <ButtonDesign>Submit</ButtonDesign>
        </form>
        <BlogList />
      </div>
    </AdminLayout>
  );
};
EditAbout.modules = {
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
EditAbout.formats = [
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

export default EditAbout;
