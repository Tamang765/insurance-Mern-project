import AdminLayout from "@/layout/AdminLayout";
import { useEffect, useState } from "react";
import { ButtonDesign, Heading, TitleSection } from "../Common/design";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import dynamic from "next/dynamic";
import Teamlist from "./Teamlist";
import { useDispatch, useSelector } from "react-redux";
import {
  createTeam,
  getAllTeams,
  getTeamId,
  selectLoading,
  selectTeam,
  updateTeam,
} from "@/redux/slice/TeamSlice";
import { useRouter } from "next/router";
import { useRedirect } from "../redirector/useRedirect";
import { toast } from "react-toastify";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const EditTeam = () => {
  useRedirect("/login");
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const teamone = useSelector(selectTeam);
  const [team, setTeam] = useState(teamone);
  const [teamImage, setTeamImage] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(null);



  useEffect(() => {
    dispatch(getTeamId(id));
  }, [dispatch, id]);

  useEffect(() => {
    setTeam(teamone);
    setImagePreview(
      teamone && teamone.image ? `${teamone.image.filePath}` : null
    );
    setDescription(teamone && teamone.description ? teamone.description : "");

  }, [teamone]);

  //handle input changes in the input section
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeam((team) => ({ ...team, [name]: value }));
  };

  //this handles show image in dashboard
  const handlePreview = (e) => {
    setTeamImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const updateMember = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", team?.name);
    formData.append("post", team?.post);
    formData.append("description", description);
    formData.append("image", teamImage);
    await dispatch(updateTeam({ id, formData }));
    await dispatch(getTeamId());
    toast.success("Task updated");
    await dispatch(getAllTeams())
  };
  return (
    <AdminLayout>
      <section className="edit-team p-12">
        <TitleSection>Edit Member</TitleSection>
        {teamone && (
          <form className="" onSubmit={updateMember}>
            <div className="">
              <Heading>Name</Heading>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  value={team?.name}
                  placeholder="write team member name"
                  className="border-2 border-gray-400 outline-none pl-3 pr-[4rem] py-2 rounded-lg"
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
                  width={200}
                  height={50}
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
                  className="border-2 border-gray-400 outline-none pl-3 pr-[4rem] py-2 rounded-lg"
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
                  modules={EditTeam.modules}
                  formats={EditTeam.formats}
                  className="h-[20vh]"
                />
              </div>
            </div>
            <ButtonDesign>update</ButtonDesign>
          </form>
        )}
        <Teamlist />
      </section>
    </AdminLayout>
  );
};
EditTeam.modules = {
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
EditTeam.formats = [
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

export default EditTeam;
