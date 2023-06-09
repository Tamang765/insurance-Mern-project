import AdminLayout from "@/layout/AdminLayout";
import { ButtonDesign, Heading, TitleSection } from "../Common/design";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import { useState } from "react";
import ServiceList from "./ServiceList";
import { useDispatch } from "react-redux";
import { createService } from "@/redux/slice/serviceSlice";
import { useRedirect } from "../redirector/useRedirect";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
const initialState = {
  title: "",
}
const AddService = () => {
  useRedirect("/login");
  const dispatch = useDispatch();
  const [service, setService] = useState(initialState);
  const [imagePreview, setImagePreview] = useState(null);
  const [contentPreview, setContentPreview] = useState("");
  const [description, setDescription] = useState("");
  const { title } = service;
  const handleImg = (e) => {
    setContentPreview(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  const handleChange = (e) => {
    const {name, value} = e.target
    setService((service)=>({...service, [name]:value}))
  }
  const submitService = async (e) => { 
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title)
    formData.append("image", contentPreview)
    formData.append("description", description)
    await dispatch(createService(formData))
  }
  return (
    <AdminLayout>
      <div className="add-service p-12">
        <TitleSection>Create New Service</TitleSection>
        <form className="" onSubmit={submitService}>
          <div className="form-group">
            <Heading>Title</Heading>
          <input type="text" name="title" value={title} onChange={handleChange} className="border-2 w-5/12 p-2 rounded-sm outline-none" placeholder="Give title service page" />
          </div>
          <div className="form-group">
            <Heading>Description</Heading>
            <ReactQuill
              theme="snow"
              placeholder="write description"
              value={description}
              onChange={setDescription}
              modules={AddService.modules}
              formats={AddService.formats}
              className="h-[20vh]"
            />
          </div>
          <br />
          <br />
          <div className="">
            <Heading>Image</Heading>
            <input
              type="file"
              alt="service-img"
              onChange={(e) => handleImg(e)}
            />
          {imagePreview !== null ? (
            <Image src={imagePreview} width={200} height={100} />
          ) : (
            "no team image to show"
          )}
          </div>
          <br />
          <br />
        <ButtonDesign>Submit</ButtonDesign>
        </form>
        <br />
        <br />
        <center><span className="text-4xl   mt-4">Services List</span></center>
        <ServiceList/>
      </div>
    </AdminLayout>
  );
};
AddService.modules = {
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
AddService.formats = [
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
export default AddService;
