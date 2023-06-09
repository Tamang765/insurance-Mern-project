import { ButtonDesign, Heading, TitleSection } from "@/Components/Common/design";
import BlogList from "@/Components/admin/BlogList";
import { useRedirect } from "@/Components/redirector/useRedirect";
import AdminLayout from "@/layout/AdminLayout";
import "react-quill/dist/quill.snow.css";
import { getAllBlogs, getBlogByID, selectoneBlog, updateBlog } from "@/redux/slice/blogSlice";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllService, getService, selectOneservice } from "@/redux/slice/serviceSlice";
import { updateService } from "@/redux/slice/serviceSlice";
import ServiceList from "@/Components/admin/ServiceList";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const EditService = () => {
  useRedirect("/login");
  const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const selectOneService= useSelector(selectOneservice)
  const [service, setService] = useState(selectOneService);
  const [imagePreview, setImagePreview] = useState(null);
  const [contentPreview, setContentPreview] = useState("");
    const [description, setDescription] = useState("");
    useEffect(() => { 
        dispatch(getService(id))
    },[dispatch, id])
  const handleImg = (e) => {
    setContentPreview(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };
  const handleDescription = (value) => {
    setDescription(value);
  };
  const updateServices = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", service?.title);
    formData.append("image", contentPreview);
    formData.append("description", description);
    console.log(formData);
      await dispatch(updateService({ id, formData }));
      await dispatch(getService())
      await dispatch(getAllService())
      router.push("/admin/add-service")
    };
    useEffect(() => { 
        setService(selectOneService);
        setImagePreview(selectOneService && selectOneService.image ? `${selectOneService.image.filePath}` : null);
        setDescription(selectOneService && selectOneService.description ? selectOneService.description:"")
    },[selectOneService])
  return (
    <AdminLayout>
      <div className="edit-service p-12">
        <TitleSection>edit Service</TitleSection>
        <form onSubmit={updateServices}>
          <div className="form-group">
            <Heading>Title</Heading>
            <input
              type="text"
              placeholder="Please give titile to blog"
              name="title"
              value={service?.title}
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
              modules={EditService.modules}
              formats={EditService.formats}
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
        <ServiceList />
      </div>
    </AdminLayout>
  );
};
EditService.modules = {
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
EditService.formats = [
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

export default EditService;
