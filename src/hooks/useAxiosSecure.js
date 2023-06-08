import React from "react";
import axios from "axios";

const useAxiosSecure = () =>
  axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

export default useAxiosSecure;
