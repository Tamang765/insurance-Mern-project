import AdminLayout from "@/layout/AdminLayout";
import { ButtonDesign, Heading, TitleSection } from "../Common/design";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Card } from "react-bootstrap";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import Aboutlist from "./aboutlist";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { createAbout } from "@/redux/slice/aboutSlice";
const ReactQuill = dynamic(() => import("react-quill"), {
  // Set this to `false` so it is only loaded on the client.
  ssr: false,
});
const initialState = {
  title:""
}
const AddAbout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [about, setAbout] = useState(initialState);
  const [description, setDescription] = useState("")
  const { title } = about
  const [aboutImage, setAboutImage]= useState("")
  const [imagePreview, setImagePreview] = useState(null);
  const handleChange = (e) => { 
    const { name, value } = e.target;
    setAbout({...about, [name]:value})
  }
  const handleImagePreview = (e) => { 
    setAboutImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }
// create 
  const submitAbout = async (e) => { 
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("image", aboutImage);
    await dispatch(createAbout(form))
    router.push("/admin/add-about");
  }

  return (
    <AdminLayout>
      <section className="add-about p-12">
        <TitleSection>Create About Us</TitleSection>
        <form className="" onSubmit={submitAbout}>
          <div>
            <Heading>Title</Heading>
            <div className="mt-2">
             <input type="text" name="title" value={title} onChange={handleChange} placeholder="give title for abous us page" className="border-2 p-2 rounded-md w-5/12 outline-none"/>
            </div>
            {/* image */}
            <div className="image_input mt-[4rem]">
              <Heading>Image</Heading>
              <input type="file" alt="about-img" onChange={(e) => handleImagePreview(e)} />
              {
                imagePreview !== null ? (
                  <Image src={imagePreview} alt="about-image" width={500} height={100}/>
              ):"No Images to Show"}
            </div>
{/* description */}
            <div className="description">
              <Heading>Description</Heading>
              <ReactQuill placeholder="write description" value={description} onChange={setDescription} theme="snow" modules={AddAbout.modules} formats={AddAbout.formats} className="h-[20vh]"/>
            </div>
            <br />
          <br />
            <ButtonDesign >Submit</ButtonDesign>
          </div>
        </form>
        <br />
        <br />
        <center ><span className="text-4xl   mt-4">About List</span> </center>
        <Aboutlist/>
      </section>
    </AdminLayout>
  );
};
AddAbout.modules = {
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
AddAbout.formats = [
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
export default AddAbout;
