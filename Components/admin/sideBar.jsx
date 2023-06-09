import {
  HiOutlineLogout,
  HiOutlineUserGroup,
  HiOutlineViewGrid,
} from "react-icons/hi";
import { SlHandbag } from "react-icons/sl";
import { GoDiffAdded } from "react-icons/go";
import { GrAddCircle } from "react-icons/gr";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { SET_LOGIN } from "@/redux/slice/authSlice";
import { logoutUser } from "@/redux/services/authService";
const sidebarData = [
  {
    id: 1,
    name: "dashboard",
    path: "/admin/dashboard",
    icon: <HiOutlineViewGrid />,
  },
  {
    id: 2,
    name: "about us",
    path: "/admin/add-about",
    icon: <GoDiffAdded />,
  },
  {
    id: 3,
    name: "service",
    path: "/admin/add-service",
    icon: <GrAddCircle />,
  },
  {
    id: 4,
    name: "blog",
    path: "/admin/add-blog",
    icon: <AiOutlineFileAdd />,
  },
  {
    id: 5,
    name: "team",
    path: "/admin/add-team",
    icon: <HiOutlineUserGroup />,
  },
  {
    id: 6,
    name: "inquiry",
    path: "/admin/inquiry-list",
    icon: <FiPhoneCall />,
  },
  {
    id: 7,
    name: "testimonial",
    path: "/admin/add-testimonial",
    icon: <FiPhoneCall />,
  },
];

const SideBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    router.push("/login");
  };
  const handleDashboard = () => {
    router.push("/admin/dashboard");
  };
  return (
    <div className="admin-sidebar w-[13%]  shadow-lg min-h-screen bg-blue-200">
      <ul className="position-fixed mt-[4rem] h-full m-auto">
        <div className="mt-[1rem]"></div>
        <button onClick={handleDashboard} className="mb-9">
          <img src="/media/logo.jpg" className="w-[180px] h-full" />
        </button>
        {sidebarData.map((links) => (
          <li key={links.id} className="overflow-hidden border-b-2 ">
            <Link
              href={links.path}
              className={`flex items-center capitalize text-md px-3 py-3 gap-3 ${
                router.pathname === links.path ? "active ml-4 bg-gray-200" : " "
              }`}
            >
              <span
                className={`mr-2 ${
                  router.pathname === links.path
                    ? "active bg-red-300 rounded-full p-2 text-white"
                    : ""
                }`}
              >
                {links.icon}
              </span>
              <span>{links.name}</span>
            </Link>
          </li>
        ))}
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-2 capitalize gap-3"
          >
            <span>
              <HiOutlineLogout />
            </span>
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
