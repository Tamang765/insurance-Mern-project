import { deleteTeam, getAllTeams } from "@/redux/slice/TeamSlice";
import DOMPurify from "dompurify";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
const Teamlist = ({ handleEdit }) => {
  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(getAllTeams());
  }, [dispatch]);
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const deleteMember = async (id) => {
    await dispatch(deleteTeam(id));
    await dispatch(getAllTeams());
    setShow(false);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (id) => {
    setDeleteId(id)
    setShow(true);
  };
  //edit section

  return (
    <div className="teamlist mt-5 ">
      <Table className="w-100 "  bordered >
        <thead>
          <tr className="border-b-2">
            <td className="px-6 pb-4 font-semibold">id</td>
            <td className="px-6 pb-4 font-semibold">FullName</td>
            <td className="px-6 pb-4 font-semibold">Post</td>
            <td className="px-6 pb-4 font-semibold">Description</td>
            <td className="px-6 pb-4 font-semibold">Image</td>
          </tr>
        </thead>
        <tbody>
          {teams.map((member, index) => (
            <tr key={member._id}>
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{member.name}</td>
              <td className="px-6 py-4">{member.post}</td>
              <td
                className="px-6 py-4"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(member.description),
                }}
              >
              </td>
              <td className="px-6 py-4">
                <Image
                  src={member?.image?.filePath}
                  alt={member?.image?.filename}
                  width={50}
                  height={50}
                />
              </td>
              <td className="px-6 py-4 flex items-center gap-3 h-[12vh]">
                <button onClick={()=>handleShow(member._id)}>
                  <RiDeleteBin6Line size={20} color="red" />
                </button>
                <Modal show={show}>
                  <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <button
                      className="border-2 p-2 mr-3 rounded-md bg-green-300"
                      onClick={() => deleteMember(deleteId)}
                    >
                      Confirm
                    </button>
                    <button
                      className="border-2 p-2 mr-3 rounded-md bg-red-300"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                  </Modal.Body>
                </Modal>
                <Link href={`/admin/team/${member._id}`}>
                  <CiEdit size={20} color="green" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Teamlist;
