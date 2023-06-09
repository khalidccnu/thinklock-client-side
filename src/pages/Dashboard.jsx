import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useUser from "../hooks/useUser.js";
import useAuth from "../hooks/useAuth.js";
import StudentSidebarLinks from "../components/StudentSidebarLinks.jsx";
import InstructorSidebarLinks from "../components/InstructorSidebarLinks.jsx";
import AdminSidebarLinks from "../components/AdminSidebarLinks.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isUserLoading, user] = useUser();
  const { userInfo, logOut } = useAuth();
  const { displayName, photoURL } = userInfo;

  const handleLogout = (_) =>
    logOut()
      .then((_) => sessionStorage.removeItem("_vu"))
      .then((_) => navigate("/login"));

  return (
    <section className="pt-28 pb-8">
      <Helmet>
        <title>{displayName} - ThinkLock</title>
      </Helmet>
      <div className="container">
        <div className="grid grid-cols-[18rem_auto] gap-10">
          <div className="bg-white p-5 -ml-6">
            <figure className="w-20 h-20 rounded-full mx-auto overflow-hidden">
              <img src={photoURL} alt="" />
            </figure>
            <h2 className="font-bold text-center mt-3">{displayName}</h2>
            <ul className="flex flex-col bg-gray-100 p-5 mt-5 rounded space-y-3">
              {!isUserLoading ? (
                user.role === "student" ? (
                  <StudentSidebarLinks />
                ) : user.role === "instructor" ? (
                  <InstructorSidebarLinks />
                ) : (
                  <AdminSidebarLinks />
                )
              ) : null}
              <li>
                <span
                  className="block px-2 py-1 rounded hover:bg-pink-600 hover:text-white cursor-pointer transition-colors duration-500"
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </li>
            </ul>
          </div>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
