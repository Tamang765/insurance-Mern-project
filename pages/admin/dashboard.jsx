import { CardPart, Grid, Heading } from "@/Components/Common/design";
import { useRedirect } from "@/Components/redirector/useRedirect";
import AdminLayout from "@/layout/AdminLayout";
import { getAllTeams } from "@/redux/slice/TeamSlice";
import { getAllAbouts, selectAbouts } from "@/redux/slice/aboutSlice";
import { getAllBlogs, selectBlogs } from "@/redux/slice/blogSlice";
import { getAllInquiry, selectInquiry } from "@/redux/slice/inquirySlice";
import { getAllService, selectServices } from "@/redux/slice/serviceSlice";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  useRedirect("/login");
  const dispatch = useDispatch();
  const { aboutlist } = useSelector((state) => state.aboutus);
  const { blogs } = useSelector((state) => state.blog);
  const { inquirys } = useSelector((state) => state.inquiry);
  const { services } = useSelector((state) => state.service);
  const { teams } = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(getAllAbouts());
    dispatch(getAllBlogs());
    dispatch(getAllInquiry());
    dispatch(getAllService());
    dispatch(getAllTeams());
  }, [dispatch]);
  return (
    <>
      <AdminLayout>
        {/* <CardPart>
          <h1 className="text-3xl font-medium capitalize">
            Welcome <span> </span>
            <span>Hero</span>
          </h1>
        </CardPart> */}
        <div className="container p-12">

            <center className="text-3xl">Dashboard</center>
            <div className="col-lg-12">
                Welcome hero
          </div>
          <div className="grid gap-5">

   
          <div className="flex gap-5">
            <Card className="w-1/2 pb-5 " >
              <div className="text-center">
                <Heading>Total About details</Heading>
                <strong>{aboutlist?.length}</strong>
              </div>
            </Card>
            <Card className="w-1/2 pb-5" >
              <div className="text-center">
                <Heading>Total Blogs</Heading>
                <strong>{blogs?.length}</strong>
              </div>
            </Card>
          </div>
          <div className="flex gap-5">
            <Card className="w-1/2 pb-5">
              <div className="text-center">
                <Heading>Total Services</Heading>
                <strong>{services?.length}</strong>
              </div>
            </Card>
            <Card className="w-1/2 pb-5">
              <div className="text-center">
                <Heading>Total Inquiries</Heading>
                <strong>{inquirys?.length}</strong>
              </div>
            </Card>
          </div>
            <Card className="w-100 pb-10">
              <div className="text-center">
                <Heading>Total Team Members</Heading>
                <strong>{teams?.length}</strong>
              </div>
            </Card>
            </div>
          </div>

      </AdminLayout>
    </>
  );
};

export default Dashboard;
