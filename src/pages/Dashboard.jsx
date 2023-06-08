import React from "react";
import { Helmet } from "react-helmet-async";
import useUser from "../hooks/useUser.js";
import useAuth from "../hooks/useAuth.js";
import StudentSidebarLinks from "../components/StudentSidebarLinks.jsx";

const Dashboard = () => {
  const [isUserLoading, user] = useUser();
  const { userInfo } = useAuth();
  const { displayName, photoURL } = userInfo;

  return (
    <section>
      <Helmet>
        <title>{displayName} - ThinkLock</title>
      </Helmet>
      <div className="container">
        <div className="flex">
          <div className="bg-white w-72 pt-28 pb-8 px-5 -ml-6">
            <figure className="w-20 h-20 rounded-full mx-auto overflow-hidden">
              <img src={photoURL} alt="" />
            </figure>
            <h2 className="font-bold text-center mt-3">{displayName}</h2>
            <ul className="flex flex-col bg-gray-100 p-5 mt-5 rounded space-y-3">
              {!isUserLoading ? (
                user.role === "student" ? (
                  <StudentSidebarLinks />
                ) : null
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
