import { Form } from "react-bootstrap";
import Title from "./Title";
import CustomButton from "./button";
import { toast } from "react-toastify";
import { useState } from "react";
import inquiryServices from "@/redux/services/inquiryServices";

const initialState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message:""
}
const Contactform = () => {
  const [formData, setFormData] = useState(initialState)
  const { name, email, phone, subject, message } = formData
  const submitHandler = async(e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      phone,
      subject,
      message
    }
    if (!name || !email || !phone || !subject || !message) { 
      return toast.error("All fields are required")
    }
    console.log(data);
    await inquiryServices.createInquiry(data);
    toast.success("Message Sent Successfully");
    setFormData(initialState)
  }
  const handleInput = (e) => { 
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  return (
    <div
      className="contactform container-fluid w-8/12 z-40 py-[4rem]"
      style={{ position: "inherit" }}
    >
      <center>
        <Title title="contact us" />
        <h2>Feel free to get in touch with experts</h2>
      </center>
      <Form onSubmit={submitHandler}>
        <div className="row mt-4">
          <div className="col-lg-6 col-sm-12 mt-3">
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={name}
              onChange={handleInput}
              className=" p-3 outline-none w-full rounded-lg"
            />
          </div>
          <div className="col-lg-6 col-sm-12 mt-3">
            <input
              type="email"
              name="email"
              value={ email}
              placeholder="Email Address"
              onChange={handleInput}
              className="p-3 outline-none w-full rounded-lg"
            />
          </div>
          <div className="col-lg-6 col-sm-12 mt-3">
            <input
              type="text"
              placeholder="Phone Number"
              name="phone"
              value={phone}
              onChange={handleInput}
              className=" p-3 outline-none w-full rounded-lg"
            />
          </div>
          <div className="col-lg-6 col-sm-12 mt-3">
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={handleInput}
              placeholder="Subject"
              className=" p-3 outline-none w-full rounded-lg"
            />
          </div>
          <div className="col-lg-12 my-3">
            <textarea
              type="textarea"
              placeholder="Message"
              name="message"
              value={message}
              onChange={handleInput}
              className="outline-none w-full p-3 rounded-lg"
              rows={4}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="border-2 rounded-md p-2 bg-blue-300 text-white">Send Message</button>
        </div>
      </Form>
    </div>
  );
};

export default Contactform;
