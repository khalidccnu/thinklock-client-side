import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth.js";
import useAxiosSecure from "./useAxiosSecure.js";

const useUser = () => {
  const [loading, setLoading] = useState(true);
  const { userInfo } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: [userInfo, "user.data"],
    enabled: !loading,
    queryFn: (_) => axiosSecure(`/users/${userInfo.uid}`),
  });

  useEffect(
    (_) => {
      userInfo ? setLoading(false) : null;
    },
    [userInfo]
  );

  return [isUserLoading, user?.data];
};

export default useUser;
