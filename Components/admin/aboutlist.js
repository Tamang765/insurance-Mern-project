import {
  deleteAbout,
  getAllAbouts,
  selectAbouts,
} from "@/redux/slice/aboutSlice";
import DOMPurify from "dompurify";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
const Aboutlist = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [deleteId, setDeletedId] = useState(null);
  const aboutlist = useSelector(selectAbouts);
  console.log(aboutlist);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (id) => {
    setDeletedId(id);
    setShow(true);
  };

  const deleteAboutlist = async (id) => {
    await dispatch(deleteAbout(id));
      await dispatch(getAllAbouts());
      setShow(false)
  };
  
  useEffect(() => {
    dispatch(getAllAbouts());
  }, [dispatch]);
  return (
    <div className="aboutlist  mt-4">
      <Table className="w-100 "  bordered >
        <thead className="border-b-2">
          <tr>
            <th scope="col" className="px-5 pb-5 font-semibold">
              id
            </th>
            <th scope="col" className="px-5 pb-5 font-semibold">
              Title
            </th>
            <th scope="col" className="px-5 pb-5 font-semibold">
              Description
            </th>
            <th scope="col" className="px-5 pb-5 font-semibold">
              Image
            </th>
            <th scope="col" className="px-5 pb-5 font-semibold">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {aboutlist.map((about, index) => (
            <tr key={about._id} className="border-b-2">
              <td className="px-5 py-1">{index + 1}</td>
              <td className="px-5 py-1">{about.title}</td>
              <td
                className="px-5 py-1"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(about.description),
                }}
              ></td>
              <td className="px-5 py-1">
                {" "}
                <Image
                  src={about?.image?.filePath}
                  alt={about?.image?.filename}
                  width={40}
                  height={20}
                />
              </td>
              <td className="px-5 py-1 flex items-center gap-3 h-20">
                <button onClick={() => handleShow(about._id)}>
                  <RiDeleteBin6Line size={20} color="red" />
                </button>
                <Modal show={show}>
                  <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <button
                      className="border-2 p-2 mr-3 rounded-md bg-green-300"
                      onClick={() => deleteAboutlist(deleteId)}
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
                <Link href={`/admin/about/${about._id}`}>
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

export default Aboutlist;
