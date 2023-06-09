import { deleteTeam, getAllTeams } from "@/redux/slice/TeamSlice";
import { deleteTestimonial, getAllTestimonial } from "@/redux/slice/TestimonialSlice";
import DOMPurify from "dompurify";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";


const TestimonialList = ({ handleEdit }) => {
  const dispatch = useDispatch();
  const { testimonial } = useSelector((state) => state.testimonial);

  useEffect(() => {
    dispatch(getAllTestimonial());
  }, [dispatch]);
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const deleteMember = async (id) => {
    await dispatch(deleteTestimonial(id));
    await dispatch(getAllTestimonial());
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
    <div className="TestimonialList  mt-5 ">
      <Table className="w-100 "  bordered >
        <thead>
          <tr className="border-b-2">
            <td className="px-6 pb-4 font-semibold">id</td>
            <td className="px-6 pb-4 font-semibold">FullName</td>
            <td className="px-6 pb-4 font-semibold">Post</td>
            <td className="px-6 pb-4 font-semibold">message</td>
            <td className="px-6 pb-4 font-semibold">Image</td>
          </tr>
        </thead>
        <tbody>
          {testimonial.map((testi, index) => (
            <tr key={testi._id}>
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{testi.name}</td>
              <td className="px-6 py-4">{testi.post}</td>
              <td
                className="px-6 py-4"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(testi.message),
                }}
              >
              </td>
              <td className="px-6 py-4">
                <Image
                  src={testi?.image?.filePath}
                  alt={testi?.image?.filename}
                  width={50}
                  height={50}
                />
              </td>
              <td className="px-6 py-4 flex items-center gap-3 h-[11vh]">
                <button onClick={()=>handleShow(testi._id)}>
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
                {/* <Link href={`/admin/team/${testi._id}`}>
                  <CiEdit size={20} color="green" />
                </Link> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TestimonialList;
