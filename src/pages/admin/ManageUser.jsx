import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tooltip } from "react-tooltip";
import useAuth from "../../hooks/useAuth.js";
import useAxiosSecure from "../../hooks/useAxiosSecure.js";
import UserCard from "../../components/UserCard.jsx";
import UserRoleModal from "../../components/modal/UserRoleModal.jsx";

const ManageUser = () => {
  const { userInfo } = useAuth();
  const [allUser, setAllUser] = useState([]);
  const [actionUser, setActionUser] = useState({});
  let [isURMOpen, setURMOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { refetch, data: users } = useQuery({
    queryKey: ["users.data"],
    queryFn: (_) => axiosSecure(`/users`),
  });

  useEffect(
    (_) => {
      const filterUsers = users?.data.filter(
        (user) => user._id !== userInfo.uid
      );

      setAllUser(filterUsers);
    },
    [users]
  );

  return (
    <div className="grid grid-cols-3 gap-7">
      {allUser?.map((user) => (
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
  );
};

export default ManageUser;
