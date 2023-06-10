import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useUser from "../hooks/useUser.js";
import useAuth from "../hooks/useAuth.js";
import useAxiosSecure from "../hooks/useAxiosSecure.js";
import StripeModal from "../components/modal/StripeModal.jsx";
import StudentSidebarLinks from "../components/StudentSidebarLinks.jsx";
import InstructorSidebarLinks from "../components/InstructorSidebarLinks.jsx";
import AdminSidebarLinks from "../components/AdminSidebarLinks.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSMOpen, setSMOpen] = useState(false);
  const [isUserLoading, user] = useUser();
  const { loading, userInfo, logOut } = useAuth();
  const { displayName, photoURL } = userInfo;
  const axiosSecure = useAxiosSecure();

  const handleLogout = (_) =>
    logOut()
      .then((_) => sessionStorage.removeItem("_vu"))
      .then((_) => navigate("/login"));

  const { data: paid, refetch: paidRefetch } = useQuery({
    queryKey: [userInfo, "paid.data"],
    enabled: !loading,
    queryFn: (_) => axiosSecure(`/${userInfo.uid}/booked-courses/paid-balance`),
  });

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
            {!isUserLoading &&
            user.role === "student" &&
            paid?.data.paidBalance ? (
              <div className="mt-3 text-center">
                <button
                  type="button"
                  className="bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-md text-sm text-blue-900 font-medium"
                  onClick={(_) => setSMOpen(true)}
                >
                  Pay Now
                </button>
              </div>
            ) : null}
            <ul className="flex flex-col bg-gray-100 p-5 mt-5 rounded space-y-3">
              {!isUserLoading ? (
                user.role === "student" ? (
                  <StudentSidebarLinks />
                ) : user.role === "instructor" ? (
                  <InstructorSidebarLinks />
                ) : user.role === "admin" ? (
                  <AdminSidebarLinks />
                ) : null
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
        <StripeModal
          isSMOpen={isSMOpen}
          setSMOpen={setSMOpen}
          paidBalance={paid?.data.paidBalance}
          paidRefetch={paidRefetch}
        />
      </div>
    </section>
  );
};

export default Dashboard;
