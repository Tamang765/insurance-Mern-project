import SideBar from "@/Components/admin/sideBar";
import TopLayer from "@/Components/admin/topLayer";
import { getLoginStatus } from "@/redux/services/authService";
import { SET_LOGIN, selectIsLoggedIn } from "@/redux/slice/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminLayout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  return (
    <>
      {isLoggedIn ? (
        <>
          {" "}
          <div className="admin-layout flex">
            <SideBar />
            <div className="admin-content w-10/12 p-2 h-[100vh] scroll-smooth">
              <TopLayer />
              {children}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default AdminLayout;
