import Contactform from "@/Components/Common/Contactform";
import Title from "@/Components/Common/Title";
import BreadCrumbSection from "@/Components/Common/breadcrumb";
import Layout from "@/layout/Layout";

const contact = () => {
  return (
    <Layout>
      <div className="contact container-fluid p-0">
        <div className="container p-0">
          <center>

          <BreadCrumbSection activeitem="contact" />
          </center>
          <div className="bg-gray-200">
            <Contactform />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default contact;
