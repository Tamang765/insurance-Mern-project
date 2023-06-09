import "@/styles/globals.css";
import "@/styles/main.scss";
import Layout from "../layout/Layout";
import { useEffect } from "react";
import Aos from "aos";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axios } from "axios";
import { getLoginStatus } from "@/redux/services/authService";
import { SET_LOGIN } from "@/redux/slice/authSlice";



export default function App({ Component, pageProps }) {
  useEffect(() => { 

    Aos.init();
    Aos.refresh();
  }, [])

   


  return (
    <>
      <ToastContainer/>


      <Provider store={...store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
