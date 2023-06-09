import AdminLayout from "@/layout/AdminLayout";
import { deleteInquiry, getAllInquiry, selectInquiry } from "@/redux/slice/inquirySlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "react-toastify";

const ContactList = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState("")
  const handleShow = (id) => { 
    setShow(true)
    setDeleteId(id)
  }
  const handleClose = () => { 
    setShow(false)
  }
  const deleteInquiries = async(id) => { 
    await dispatch(deleteInquiry(id))
    await dispatch(getAllInquiry())
  }
  const inquiries = useSelector(selectInquiry)
  useEffect(() => { 
    dispatch(getAllInquiry())
  },[dispatch])
  return (
    <AdminLayout>
      <div className="contactlist  mt-4">
        <center><span className="font-semibold text-5xl underline">Inquiry List</span> </center>
        <br />
        <Table className="w-100 mt-5"  bordered >
          <thead>
            <tr>
              <th className="px-6 pb-4 font-semibold">Id</th>
              <th className="px-6 pb-4 font-semibold">fullname</th>
              <th className="px-6 pb-4 font-semibold">email</th>
              <th className="px-6 pb-4 font-semibold">phoneNumber</th>
              <th className="px-6 pb-4 font-semibold">subject</th>
              <th className="px-6 pb-4 font-semibold">message</th>
            </tr>
          </thead>
          <tbody>
            {inquiries?.map((inquiry,index)=>(
              <tr className="border-b-2">
                <td className="px-6 py-3">{index + 1}</td>
              <td className="px-6 py-3">{inquiry.name}</td>
              <td className="px-6 py-3">{inquiry.email}</td>
              <td className="px-6 py-3">{inquiry.phone}</td>
              <td className="px-6 py-3">{inquiry.subject}</td>
              <td className="px-6 py-3">{inquiry.message}</td>
              <td className="px-6 py-4 flex items-center gap-3 h-20">
                <button onClick={()=>handleShow(inquiry._id)}>
                  <RiDeleteBin6Line size={20} color="red" />
                  </button>
                  <Modal show={show}>
                  <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <button
                      className="border-2 p-2 mr-3 rounded-md bg-green-300"
                      onClick={()=>deleteInquiries(deleteId)}
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
              </td>
              </tr>
            ))
            }
          </tbody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default ContactList;
