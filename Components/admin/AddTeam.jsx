import AdminLayout from "@/layout/AdminLayout";
import { useEffect, useState } from "react";
import { ButtonDesign, Heading, TitleSection } from "../Common/design";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import dynamic from "next/dynamic";
import Teamlist from "./Teamlist";
import { useDispatch, useSelector } from "react-redux";
import { createTeam, getAllTeams, getTeamId, selectLoading, selectTeam, updateTeam } from "@/redux/slice/TeamSlice";
import { useRouter } from "next/router";
import { useRedirect } from "../redirector/useRedirect";
import { toast } from "react-toastify";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
const initialState = {
  name: "",
  post: "",
};

const AddTeam = () => {
  useRedirect("/login");
  const dispatch = useDispatch();
  const router = useRouter();
  const [team, setTeam] = useState(initialState);
  const [teamImage, setTeamImage] = useState("");
  const [description, setDescription] = useState("");

  const [imagePreview, setImagePreview] = useState(null);
  const { name, post } = team;
  const [edit, setEdit] = useState(false);
  


  //handle input changes in the input section
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeam((team)=>({...team,[name]:value}));
    console.log(team);
  };

  //this handles show image in dashboard
  const handlePreview = (e) => {
    setTeamImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  //submittion of the team
  const saveCreateTeam = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("post", post);
    formData.append("description", description);
    formData.append("image", teamImage);
    console.log(formData);
    await dispatch(createTeam(formData));
    await dispatch(getAllTeams())
    setTeam({ ...formData, name: "", description: "", post:"" });
  };

  //edit
  const handleEdit = async (teams) => {
    setTeam({
      name: teams?.name,
      post: teams?.post,
      description: teams?.description,
      image: teams?.image,
    });
    setMemberID(teams?._id);
    setEdit(true);
  };
  const updateMember = async (e) => {
    e.preventDefault();
    if (!name || !post || !description) {
      return toast.error("please fill all form");
    }
    // const formData = new FormData();
    // formData.append("name", team?.name);
    // formData.append("post", team?.post);
    // formData.append("description", team?.description);
    // formData.append("image", teamImage);
    // console.log(team);
    setTeam({...team, name:"", post:"", description:""})
    setEdit(false);
    toast.success("Task updated");
    window.location.reload(true);
  };


  return (
    <AdminLayout>
      <section className="add-team p-12">
        <TitleSection>
          {edit ? "Edit Member" : "Create New Team Member"}
        </TitleSection>
        <form className="" onSubmit={edit ? updateMember : saveCreateTeam}>
          <div className="">
            <Heading>Name</Heading>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                value={team?.name}
                placeholder="write team member name"
                className="border-2 border-gray-400 outline-none w-5/12 p-2 rounded-md"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="">
            <Heading>Image</Heading>
            <input
              type="file"
              alt="team-image"
              onChange={(e) => handlePreview(e)}
            />
            {imagePreview !== null ? (
              <Image
                src={imagePreview}
                alt="team-image"
                width={500}
                height={100}
              />
            ) : (
              "No team to show"
            )}
          </div>
          <div className="">
            <Heading>Post</Heading>
            <div className="mt-5">
              <input
                type="text"
                name="post"
                value={team?.post}
                placeholder="place post of the member"
                className="border-2 border-gray-400 outline-none w-5/12 p-2 rounded-md"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="">
            <Heading>Description</Heading>
            <div className="mt-5">
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                placeholder="Write Post"
                modules={AddTeam.modules}
                formats={AddTeam.formats}
                className="h-[20vh]"
              />
            </div>
          </div>
          <br />
          <br />
          <ButtonDesign>Submit</ButtonDesign>
        </form>
        <br />
        <br />
        <center > <span className="text-5xl font-bold underline  mt-4">Team List</span></center>
        <Teamlist handleEdit={handleEdit} />
      </section>
    </AdminLayout>
  );
};
AddTeam.modules = {
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
AddTeam.formats = [
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

export default AddTeam;
