import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tooltip } from "react-tooltip";
import useAuth from "../../hooks/useAuth.js";
import useAxiosSecure from "../../hooks/useAxiosSecure.js";
import UserCard from "../../components/UserCard.jsx";
import UserRoleModal from "../../components/modal/UserRoleModal.jsx";

const ManageUser = () => {
  const [isLoading, setLoading] = useState(true);
  const { userInfo } = useAuth();
  const [allUser, setAllUser] = useState([]);
  const [actionUser, setActionUser] = useState({});
  let [isURMOpen, setURMOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { data: users, refetch } = useQuery({
    queryKey: ["users.data"],
    queryFn: (_) => axiosSecure(`/users`),
  });

  useEffect(
    (_) => {
      const filterUsers = users?.data.filter(
        (user) => user._id !== userInfo.uid
      );

      setAllUser(filterUsers);
      setLoading(false);
    },
    [users]
  );

  return !isLoading ? (
    allUser?.length ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-7">
        {allUser.map((user) => (
          <UserCard
            key={user._id}
            setActionUser={setActionUser}
            setURMOpen={setURMOpen}
            user={user}
          />
        ))}
        <Tooltip anchorSelect=".title" />
        <UserRoleModal
          isURMOpen={isURMOpen}
          setURMOpen={setURMOpen}
          refetch={refetch}
          actionUser={actionUser}
        />
      </div>
    ) : (
      <div className="alert max-w-sm mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>There is no user to manage!</span>
      </div>
    )
  ) : null;
};

export default ManageUser;
