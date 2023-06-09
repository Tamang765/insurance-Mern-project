import BreadCrumbSection from "@/Components/Common/breadcrumb";
import { Loader } from "@/Components/Loader";
import { blogData } from "@/Data/Data";
import Layout from "@/layout/Layout";
import blogServices from "@/redux/services/blogService";
import { getAllBlogs, getOneBlog, selectBlogs, selectoneBlog } from "@/redux/slice/blogSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const BlogDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug);
  // const singleBlog = blogData.filter(
  //     (items) => items.title.toLowerCase() === title
  //     );
  //     console.log(singleBlog);

  const oneBlog = useSelector(selectoneBlog);
  const blogs = useSelector(selectBlogs);
  const isLoading = useSelector((state) => state.blog.isLoading);
  const [selectedBlog, setSelectedBlog] = useState(oneBlog);

  useEffect(() => {
    async function fetchBlog() {
      if (slug) {
        await dispatch(getOneBlog(slug));
      }
    }

    async function fetchAllBlogs() {
      await dispatch(getAllBlogs());
    }

    Promise.all([fetchBlog(), fetchAllBlogs()]).then(() => {
      // You can dispatch an action to update the isLoading state in the Redux slice
      dispatch({ type: 'blog/setIsLoading', payload: false });
    });
  }, [dispatch, slug]);

  const today = new Date();
  const fiveDaysAgo = new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000);
  const sortedBlogPosts = blogData
    ?.filter((post) => new Date(post.createdDate) >= fiveDaysAgo)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Layout>
      <div className="blogdetail container-fluid p-0">
        <div className="container p-0">
          <BreadCrumbSection source="blog" activeitem={slug} />
{isLoading?<Loader/>:
          <div className="row blogdetail-section w-10/12 m-auto pt-[8rem]">
            <div className="col-lg-8 col-sm-12" key={oneBlog?._id}>
              
              <div className="grid">
                {oneBlog?.image ? (
                  <img
                    src={oneBlog?.image.filePath}
                    alt="blog-img1"
                    className="w-11/12  rounded-2xl shadow-lg"
                  />
                ) : (
                  ""
                )}
                <div className="flex gap-3 items-center my-3">
                  <BsPersonCircle color="blue" />
                  <small>by Admin</small>
                  <span className="flex gap-2 items-center">
                    <AiOutlineCalendar color="blue" />
                    <small>{oneBlog?.createdAt}</small>{" "}
                  </span>{" "}
                </div>
                <p className="text-gray-500 my-3 leading-10">
                  {oneBlog?.description}
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-sm-12">
              <h2 className="font-semibold">Latest Posts</h2>
              {blogs.map((recentBlogs) => (
                <Link href={`/blog/${recentBlogs.title.toLowerCase()}`}>
                  <div className="grid mt-4" key={recentBlogs._id}>
                    <div className="flex gap-3 items-center">
                      <img
                        src={recentBlogs.image.filePath}
                        alt="blog-img"
                        className="w-4/12 rounded-xl"
                      />
                      <div>
                        <span className="flex gap-2">
                          <BsPersonCircle color="blue" />
                          <small>by Admin</small>
                        </span>
                        <strong>{recentBlogs.title.slice(0, 20)}</strong>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>}
        </div>
      </div>
    </Layout>
  );
};

export default BlogDetail;
