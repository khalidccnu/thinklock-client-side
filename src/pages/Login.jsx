import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import qs from "query-string";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth.js";
import Signup from "../components/Signup.jsx";

const Login = () => {
  const { loading, setLoading, signInWithEP, signInWithGoogle } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const location = useLocation();
  const fromURL = location.state?.fromURL.pathname;

  const handleTab = (_) => {
    let query = {};

    if (params.size) query = qs.parse(params.toString());

    params.get("signup") === "true"
      ? delete query.signup
      : (query = { ...query, signup: true });

    const url = qs.stringifyUrl(
      {
        url: location.pathname,
        query,
      },
      { skipNull: true }
    );

    navigate(url);
  };

  const handleLoginWithEP = (data) => {
    const { email, password } = data;

    signInWithEP(email, password)
      .then((_) => navigate(fromURL || "/dashboard"))
      .catch((err) => {
        setLoading(false);

        if (err.message === "Firebase: Error (auth/wrong-password).")
          toast.error("Incorrect password!");
        else if (err.message === "Firebase: Error (auth/user-not-found).")
          toast.error("User not found!");
      });
  };

  const handleLoginWithGoogle = (_) => {
    signInWithGoogle()
      .then((_) => navigate(fromURL || "/dashboard"))
      .catch((_) => setLoading(false));
  };

  useEffect((_) => {
    if (fromURL)
      toast.error(
        "Only registered user can access this page. Please, login first!"
      );
  }, []);

  return (
    <section className="pt-32 pb-8">
      <Helmet>
        {params.get("signup") === "true" ? (
          <title>Signup - ThinkLock</title>
        ) : (
          <title>Login - ThinkLock</title>
        )}
      </Helmet>
      <div className="container">
        <div className="artboard phone-2 max-w-full !h-auto mx-auto border border-[#e87425] rounded p-5">
          <Tabs defaultIndex={params.get("signup") === "true" ? 1 : 0}>
            <TabList className="tabs tabs-boxed w-fit mx-auto mb-8">
              <Tab
                className="tab"
                selectedClassName="bg-[#e87425] text-white btn-disabled"
                onClick={handleTab}
              >
                Login
              </Tab>
              <Tab
                className="tab"
                selectedClassName="bg-[#e87425] text-white btn-disabled"
                onClick={handleTab}
              >
                Signup
              </Tab>
            </TabList>
            <TabPanel>
              <h3 className="text-[#e87425] font-bold text-2xl text-center">
                Login
              </h3>
              <form
                className="form-control mt-5 space-y-4"
                onSubmit={handleSubmit(handleLoginWithEP)}
              >
                <div className="relative">
                  <input
                    type="email"
                    className="peer input input-sm input-bordered text-[#e87425] w-full px-3 py-5 rounded focus:outline-none focus:ring-2 focus:ring-[#e87425] valid:ring-2 valid:ring-[#e87425]"
                    {...register("email")}
                    required={true}
                  />
                  <label className="absolute top-0 left-0 ml-3 mt-2.5 text-gray-400 peer-focus:-translate-y-1/2 peer-focus:bg-[#e87425] peer-focus:text-white peer-focus:mt-0 peer-focus:px-2 peer-focus:rounded peer-valid:-translate-y-1/2 peer-valid:bg-[#e87425] peer-valid:text-white peer-valid:mt-0 peer-valid:px-2 peer-valid:rounded transition-all duration-300 pointer-events-none">
                    Email
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    className="peer input input-sm input-bordered text-[#e87425] w-full px-3 py-5 rounded focus:outline-none focus:ring-2 focus:ring-[#e87425] valid:ring-2 valid:ring-[#e87425]"
                    {...register("password")}
                    required={true}
                  />
                  <label className="absolute top-0 left-0 ml-3 mt-2.5 text-gray-400 peer-focus:-translate-y-1/2 peer-focus:bg-[#e87425] peer-focus:text-white peer-focus:mt-0 peer-focus:px-2 peer-focus:rounded peer-valid:-translate-y-1/2 peer-valid:bg-[#e87425] peer-valid:text-white peer-valid:mt-0 peer-valid:px-2 peer-valid:rounded transition-all duration-300 pointer-events-none">
                    Password
                  </label>
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn btn-sm w-full h-auto py-3.5 bg-[#e87425] hover:bg-transparent text-white hover:text-[#e87425] !border-[#e87425] rounded normal-case"
                  >
                    <span>Login</span>
                    {loading ? (
                      <span
                        className="inline-block h-4 w-4 border-2 border-current border-r-transparent rounded-full ml-1 animate-spin"
                        role="status"
                      ></span>
                    ) : null}
                  </button>
                </div>
                <div className="divider">or</div>
                <div
                  className="flex justify-center items-center p-2 border rounded hover:text-[#e87425] hover:border-[#e87425] space-x-2 cursor-pointer transition-colors duration-500"
                  onClick={handleLoginWithGoogle}
                >
                  <FaGoogle className="text-2xl" />
                  <span>Continue with Google</span>
                </div>
              </form>
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Login;
