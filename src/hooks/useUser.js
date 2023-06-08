import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth.js";
import useAxiosSecure from "./useAxiosSecure.js";

const useUser = () => {
  const { loading, userInfo } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: [userInfo.uid, "user.data"],
    enabled: !loading,
    queryFn: (_) => axiosSecure(`/users/${userInfo.uid}`),
  });

  return [isUserLoading, user?.data];
};

export default useUser;
