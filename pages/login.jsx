import Layout from "@/layout/Layout";
import { loginUser } from "@/redux/services/authService";
import { SET_LOGIN } from "@/redux/slice/authSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const initialState = {
  email: "",
  password: "",
};
const login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;
  const handleLogin = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !email) {
      return toast.error("All fields are required");
    }
    const userData = {
      email,
      password,
    };
    setLoading(true);
    try {
      const data = await loginUser(userData);
      await dispatch(SET_LOGIN(true));
      setLoading(false);
      router.push("/admin/dashboard");
    } catch (error) {
      setLoading(false);
      return toast.error("something went wrong");
    }
  };
  return (
    <Layout>
      <div className="login container w-4/12 my-4 pt-[5rem] pb-[15rem]">
        <center>Login Form</center>
      <Form onSubmit={handleSubmit} className="mt-[3rem]">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            placeholder="Enter email"
            onChange={handleLogin}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleLogin}
          />
        </Form.Group>
          <center>
        <Button  type="submit" className="text-white bg-blue-300">
          Submit
        </Button>
        </center>
        {/* <Link href="/register">Create New Account !!</Link> */}
      </Form>
    </div>
    </Layout>
  );
};

export default login;
