import Layout from "@/layout/Layout";
import { registerUser } from "@/redux/services/authService";
import { SET_LOGIN, SET_NAME } from "@/redux/slice/authSlice";
import Link from "next/link";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const initialState = {
  fullname: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const { fullname, email, password, confirmPassword } = formData;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const register = async (e) => {
    e.preventDefault();
    if (!fullname || !email || !password) {
      return toast.error("All Fileds are required");
    }
    if (password?.length < 8) {
      return toast.error("Password  must be upto 8 characters");
    }
    if (password !== confirmPassword) {
      return toast.error("Password doesn't match");
    }

    const userData = {
      fullname,
      email,
      password,
    };
    try {
      const data = await registerUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data?.fullname));
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Layout>
    <div className="register w-8/12 my-5 m-auto">
      <Form onSubmit={register}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={fullname}
            name="fullname"
            onChange={handleChange}
          />
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            name="password"
            onChange={handleChange}
          />
          <Form.Label> Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repeat Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
          <button>Register</button>
          <Link href="/login">already have a account</Link>
        </Form.Group>
      </Form>
    </div>
    </Layout>
  );
};

export default Register;
