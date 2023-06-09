import { deleteBlog, getAllBlogs } from "@/redux/slice/blogSlice";
import Link from "next/link";
import React, { useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";
import Image from "next/image";
import { Modal, Table } from "react-bootstrap";
import { useState } from "react";

const BlogList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId]= useState(null)
  const { blogs, isError, message } = useSelector((state) => state.blog);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (id) => {
    setDeleteId(id)
    setShow(true);
  };
  const deleteBlogs = async(id) => { 
    await dispatch(deleteBlog(id))
    await dispatch(getAllBlogs())
    setShow(false)
  }
  useEffect(() => {
    dispatch(getAllBlogs());
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, message]);
  return (
    <div className="service-list   mt-4">
      <Table className="w-100 "  bordered >
        <thead className="border-b-2">
          <tr>
            <th className="px-6 pb-4 font-semibold">Id</th>
            <th className="px-6 pb-4 font-semibold">Title</th>
            <th className="px-6 pb-4 font-semibold">Image</th>
            <th className="px-6 pb-4 font-semibold">Description</th>
            <th className="px-6 pb-4 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog._id} className="border-b-2">
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{blog.title}</td>
              <td className="px-6 py-4">
                <Image
                  src={blog?.image?.filePath}
                  alt={blog?.image?.filename}
                  width={50}
                  height={20}
                />
              </td>
              <td
                className="px-6 py-4"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(blog.description),
                }}
              ></td>
              <td className="px-6 py-4 flex items-center gap-3 h-[12vh]">
                <button onClick={()=>handleShow(blog._id)}>
                  <RiDeleteBin6Line size={20} color="red" />
                </button>
                <Modal show={show}>
                  <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <button
                      className="border-2 p-2 mr-3 rounded-md bg-green-300"
                      onClick={()=>deleteBlogs(deleteId)}
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
                <Link href={`/admin/blog/${blog._id}`}>
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

export default BlogList;
