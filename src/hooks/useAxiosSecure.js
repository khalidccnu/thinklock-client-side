import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import useAuth from "./useAuth.js";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect((_) => {
    axiosSecure.interceptors.request.use((req) => {
      const token = localStorage.getItem("_at");

      if (token) req.headers.Authorization = `Bearer ${token}`;

      return req;
    });

    axiosSecure.interceptors.response.use(
      (res) => res,
      async (err) => {
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          await logOut()
            .then((_) => sessionStorage.removeItem("_vu"))
            .then((_) => {
              navigate("/login");
              toast.error(err.response.data.message);
            });
        } else {
          toast.error("Something went wrong!");
        }

        return Promise.reject(err);
      }
    );
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
