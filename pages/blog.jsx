import Blogcard from "@/Components/Common/blogcard"
import BreadCrumbSection from "@/Components/Common/breadcrumb"
import { blogData } from "@/Data/Data"
import Layout from "@/layout/Layout"
import { getAllBlogs } from "@/redux/slice/blogSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const blog = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blog)
  useEffect(() => { 
    dispatch(getAllBlogs())
  }, [dispatch])
  return (
    <Layout>
      <div className="blog container-fluid p-0">
      <div className="container p-0">
        <BreadCrumbSection activeitem="blog"/>
            <div className="row blog-section w-10/12 m-auto py-[5rem]">                
          {blogs?.map((blogs) => (
              <div className="blog-card col-lg-4 col-sm-12 mt-3 m-auto rounded-lg " key={blogs.id}>
                <Blogcard image={blogs.image.filePath} title={blogs.title} description={blogs.description} link={blogs.title.toLowerCase()} />
              </div>
            ))}
            </div>
          </div>
    </div>
    </Layout>
  )
}
export default blog