import axios from "axios";
import { toast } from "react-toastify";
export const API = "http://localhost:5000/api";
export const BACKEND_URL = process.env.BACKEND_URL_LINK;

//register user 
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API}/register`, userData, {
      withCredentials: true,
    });
    if (response.statusText === "OK") {
      toast.success("User Register successfully");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }

  
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API}/login`, userData, {
      withCredentials: true,
    });
    if (response.statusText === "OK") {
      toast.success("Login Sucessfull");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
export const logoutUser = async () => {
  try {
    await axios.get(`${API}/logout`, {
      withCredentials: true,
    });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getLoginStatus = async () => {
  try {
    const response = await axios.get(`${API}/loggedin`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
