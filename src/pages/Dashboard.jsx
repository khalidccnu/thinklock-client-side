import React, { useEffect, useState } from "react";
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
import { CgMenuLeft } from "react-icons/cg";
import { FaAngleLeft, FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [hbMenu, setHbMenu] = useState(true);
  const [isSMOpen, setSMOpen] = useState(false);
  const [isUserLoading, user] = useUser();
  const { userInfo, logOut } = useAuth();
  const { displayName, photoURL } = userInfo;
  const axiosSecure = useAxiosSecure();

  const { data: paid, refetch: paidRefetch } = useQuery({
    queryKey: [userInfo, "paid.data"],
    enabled: !isLoading,
    queryFn: (_) => axiosSecure(`/${userInfo.uid}/booked-courses/paid-balance`),
  });

  const handleLogout = (_) =>
    logOut()
      .then((_) => sessionStorage.removeItem("_vu"))
      .then((_) => navigate("/login"));

  const handleResize = (_) => {
    if (innerWidth >= 768) setHbMenu(false);
    else setHbMenu(true);
  };

  useEffect(() => {
    handleResize();

    addEventListener("resize", handleResize);

    return () => removeEventListener("resize", handleResize);
  }, []);

  useEffect(
    (_) => {
      if (user?.role === "student") setLoading(false);
    },
    [user]
  );

  return (
    <section className="pt-28 pb-8">
      <Helmet>
        <title>{displayName} - ThinkLock</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-[18rem_auto]">
        <div
          className={`fixed md:static ${
            hbMenu ? "-left-96" : "left-0"
          } top-0 w-72 md:w-auto h-full md:h-auto p-5 pt-28 md:-mt-28 md:-mb-8 bg-white z-10 transition-[left] duration-500`}
        >
          <FaAngleLeft
            className="md:hidden text-2xl mb-5 cursor-pointer"
            onClick={(_) => setHbMenu(true)}
          />
          <div className="md:sticky md:top-28">
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
                  className="flex px-2 py-1 leading-5 gap-1 rounded hover:bg-pink-600 hover:text-white cursor-pointer transition-colors duration-500"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="container">
          <CgMenuLeft
            className="md:hidden text-lg mb-5 cursor-pointer"
            onClick={(_) => setHbMenu(false)}
          />
          <Outlet />
        </div>
      </div>
      <StripeModal
        isSMOpen={isSMOpen}
        setSMOpen={setSMOpen}
        paidBalance={paid?.data.paidBalance}
        paidRefetch={paidRefetch}
      />
    </section>
  );
};

export default Dashboard;
