import { deleteService, getAllService, selectServices } from "@/redux/slice/serviceSlice";
import DOMPurify from "dompurify";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
const ServiceList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId]= useState(null)
  const { services } = useSelector((state) => state.service);
  console.log(services);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (id) => {
    setDeleteId(id)
    setShow(true);
  };
  const deleteServices = async(id) => { 
    await dispatch(deleteService(id))
    await dispatch(getAllService())
    setShow(false)
  }
  useEffect(() => {
    dispatch(getAllService());
  }, [dispatch]);
  return (
    <div className="service-list  mt-4">
      <Table className="w-100 "  bordered >
        <thead className="border-b-2">
          <tr>
            <th className="px-6 pb-4 font-semibold">Id</th>
            <th className="px-6 pb-4 font-semibold">Title</th>
            <th className="px-6 pb-4 font-semibold">Image</th>
            <th className="px-6 pb-4 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {services.map((items, index) => (
            <tr key={items._id} className="border-b-2">
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{items.title}</td>
              <td className="px-6 py-4">
                {" "}
                <Image
                  src={items?.image?.filePath}
                  alt={items?.image?.fileName}
                  width={50}
                  height={20}
                />
              </td>
              <td className="px-6 py-4"    dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(items.description),
                }}></td>
              <td className="px-6 py-4 flex items-center gap-3 h-[12vh]">
                <button className="border-2 p-2 mr-3 rounded-md "
                  onClick={() => handleShow(items._id)}>
                  <RiDeleteBin6Line size={20} color="red" />
                </button>
                <Modal show={show}>
                  <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <button
                      className="border-2 p-2 mr-3 rounded-md bg-green-300"
                      onClick={()=>deleteServices(deleteId)}
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
                <Link href={`/admin/service/${items._id}`}>
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

export default ServiceList;
