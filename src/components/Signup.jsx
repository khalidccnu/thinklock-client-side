import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaArrowLeft, FaInfoCircle, FaUpload } from "react-icons/fa";
import useAuth from "../hooks/useAuth.js";

const Signup = () => {
  const { loading, setLoading, createUserWithEP } = useAuth();
  const navigate = useNavigate();
  const { register, getValues, handleSubmit } = useForm();
  const [passVal, setPassVal] = useState(false);
  const [passValWarn, setPassValWarn] = useState({});
  const [nextPhase, setNextPhase] = useState(false);
  const [photo, setPhoto] = useState(null);

  const handlePassword = (value) => {
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;

    if (!regex.test(value)) {
      setPassValWarn({});

      const validValues = [];
      const lowercase = /(?=.*[a-z])/;
      const uppercase = /(?=.*[A-Z])/;
      const number = /(?=.*\d)/;
      const character = /(?=.*\W)/;

      if (lowercase.test(value))
        !validValues.includes(lowercase) ? validValues.push("lowercase") : null;
      if (uppercase.test(value))
        !validValues.includes(uppercase) ? validValues.push("uppercase") : null;
      if (number.test(value))
        !validValues.includes(number) ? validValues.push("number") : null;
      if (character.test(value))
        !validValues.includes(character) ? validValues.push("character") : null;

      validValues.map((elem) =>
        setPassValWarn((prev) => {
          return { ...prev, [elem]: true };
        })
      );

      return false;
    }

    setPassValWarn({
      lowercase: true,
      uppercase: true,
      number: true,
      character: true,
    });
  };

  const handleNextPhase = (_) => {
    const { email, password, cfPassword } = getValues();

    if (email === "" || password === "" || cfPassword === "") {
      toast.error("All fields are required!");
      return false;
    } else if (password !== cfPassword) {
      toast.error("Password and Confirm Password does not match!");
      return false;
    } else if (Object.keys(passValWarn).length < 4) {
      toast.error("Password expression does not match!");
      return false;
    } else if (password.length < 6) {
      toast.error("Password should be at least 6 characters long!");
      return false;
    }

    setNextPhase(true);
  };

  const handleSignup = (data) => {
    const { email, password, name, phone, gender, role } = data;

    if (
      name === "" ||
      phone === "" ||
      gender === null ||
      role === "" ||
      !photo
    ) {
      toast.error("All fields are required!");
      return false;
    }

    createUserWithEP(email, password, name, phone, gender, role, photo)
      .then((_) =>
        toast.success(
          "Your account has been created successfully! You are being redirected, please wait..."
        )
      )
      .then((_) => setTimeout((_) => navigate("/dashboard"), 3000))
      .catch((err) => {
        setLoading(false);

        if (err.message === "Firebase: Error (auth/email-already-in-use).")
          toast.error("Email already in use!");
      });
  };

  return (
    <>
      <div className="relative text-[#e87425]">
        <FaArrowLeft
          className={`${
            nextPhase ? "inline-block" : "hidden"
          } absolute top-1/2 -translate-y-1/2 cursor-pointer`}
          onClick={(_) => setNextPhase(false)}
        />
        <h3 className="font-bold text-2xl text-center">Signup</h3>
      </div>
      <form className="form-control mt-5" onSubmit={handleSubmit(handleSignup)}>
        <div className={`${nextPhase ? "hidden " : ""}space-y-4`}>
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
              onKeyUp={(e) => handlePassword(e.target.value)}
              onFocus={(_) => setPassVal(true)}
              onBlurCapture={(_) => setPassVal(false)}
              {...register("password")}
              required={true}
            />
            <label className="absolute top-0 left-0 ml-3 mt-2.5 text-gray-400 peer-focus:-translate-y-1/2 peer-focus:bg-[#e87425] peer-focus:text-white peer-focus:mt-0 peer-focus:px-2 peer-focus:rounded peer-valid:-translate-y-1/2 peer-valid:bg-[#e87425] peer-valid:text-white peer-valid:mt-0 peer-valid:px-2 peer-valid:rounded transition-all duration-300 pointer-events-none">
              Password
            </label>
          </div>
          <div
            className={`${
              !passVal
                ? "max-h-0 opacity-0 !-mt-0"
                : "max-h-96 opacity-100 !mt-4"
            } overflow-hidden transition-[max-height,_opacity, margin-top] duration-500`}
          >
            <div className="alert grid-flow-row grid-cols-1 rounded">
              <div
                className={`flex items-center ${
                  passValWarn.lowercase ? "text-green-500" : "text-red-500"
                } space-x-2`}
              >
                <FaInfoCircle />
                <span>At least one lowercase</span>
              </div>
              <div
                className={`flex items-center ${
                  passValWarn.uppercase ? "text-green-500" : "text-red-500"
                } space-x-2`}
              >
                <FaInfoCircle />
                <span>At least one uppercase</span>
              </div>
              <div
                className={`flex items-center ${
                  passValWarn.number ? "text-green-500" : "text-red-500"
                } space-x-2`}
              >
                <FaInfoCircle />
                <span>At least one number</span>
              </div>
              <div
                className={`flex items-center ${
                  passValWarn.character ? "text-green-500" : "text-red-500"
                } space-x-2`}
              >
                <FaInfoCircle />
                <span>At least one character</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <input
              type="password"
              className="peer input input-sm input-bordered text-[#e87425] w-full px-3 py-5 rounded focus:outline-none focus:ring-2 focus:ring-[#e87425] valid:ring-2 valid:ring-[#e87425]"
              {...register("cfPassword")}
              required={true}
            />
            <label className="absolute top-0 left-0 ml-3 mt-2.5 text-gray-400 peer-focus:-translate-y-1/2 peer-focus:bg-[#e87425] peer-focus:text-white peer-focus:mt-0 peer-focus:px-2 peer-focus:rounded peer-valid:-translate-y-1/2 peer-valid:bg-[#e87425] peer-valid:text-white peer-valid:mt-0 peer-valid:px-2 peer-valid:rounded transition-all duration-300 pointer-events-none">
              Confirm Password
            </label>
          </div>
          <button
            type="button"
            className="btn btn-sm w-full h-auto py-3.5 bg-[#e87425] hover:bg-transparent text-white hover:text-[#e87425] !border-[#e87425] rounded normal-case"
            onClick={handleNextPhase}
          >
            Next
          </button>
        </div>
        <div className={`${!nextPhase ? "hidden " : ""}space-y-4`}>
          <div className="relative">
            <input
              type="text"
              className="peer input input-sm input-bordered text-[#e87425] w-full px-3 py-5 rounded focus:outline-none focus:ring-2 focus:ring-[#e87425] valid:ring-2 valid:ring-[#e87425]"
              {...register("name")}
              required={true}
            />
            <label className="absolute top-0 left-0 ml-3 mt-2.5 text-gray-400 peer-focus:-translate-y-1/2 peer-focus:bg-[#e87425] peer-focus:text-white peer-focus:mt-0 peer-focus:px-2 peer-focus:rounded peer-valid:-translate-y-1/2 peer-valid:bg-[#e87425] peer-valid:text-white peer-valid:mt-0 peer-valid:px-2 peer-valid:rounded transition-all duration-300 pointer-events-none">
              Name
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              className="peer input input-sm input-bordered text-[#e87425] w-full px-3 py-5 rounded focus:outline-none focus:ring-2 focus:ring-[#e87425] valid:ring-2 valid:ring-[#e87425]"
              {...register("phone")}
              required={true}
            />
            <label className="absolute top-0 left-0 ml-3 mt-2.5 text-gray-400 peer-focus:-translate-y-1/2 peer-focus:bg-[#e87425] peer-focus:text-white peer-focus:mt-0 peer-focus:px-2 peer-focus:rounded peer-valid:-translate-y-1/2 peer-valid:bg-[#e87425] peer-valid:text-white peer-valid:mt-0 peer-valid:px-2 peer-valid:rounded transition-all duration-300 pointer-events-none">
              Phone
            </label>
          </div>
          <div className="flex justify-between">
            <div className="flex space-x-2">
              <div className="flex items-center">
                <input
                  id="male"
                  type="radio"
                  value="male"
                  className="radio radio-sm"
                  {...register("gender")}
                />
                <label htmlFor="male" className="label label-text">
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="female"
                  type="radio"
                  value="female"
                  className="radio radio-sm"
                  {...register("gender")}
                />
                <label htmlFor="male" className="label label-text">
                  Female
                </label>
              </div>
            </div>
            <select
              className="select select-sm select-bordered h-auto py-1 rounded focus:outline-0"
              {...register("role")}
            >
              <option value="" selected="selected" disabled>
                Role
              </option>
              <option value="instructor">Instructor</option>
              <option value="student">Student</option>
            </select>
          </div>
          <div>
            <input
              type="file"
              name="photo"
              id="photo"
              className="hidden"
              accept="image/*"
              onChange={(e) => setPhoto(e.currentTarget.files[0])}
            />
            <label
              htmlFor="photo"
              className="btn btn-sm w-full h-auto py-3.5 rounded normal-case"
            >
              {photo ? (
                photo.name.substring(0, photo.name.lastIndexOf("."))
              ) : (
                <>
                  <span>Choose Profile Photo</span>
                  <FaUpload />
                </>
              )}
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-sm w-full h-auto py-3.5 bg-[#e87425] hover:bg-transparent text-white hover:text-[#e87425] !border-[#e87425] rounded normal-case"
          >
            <span>Signup</span>
            {loading ? (
              <span
                className="inline-block h-4 w-4 border-2 border-current border-r-transparent rounded-full ml-1 animate-spin"
                role="status"
              ></span>
            ) : null}
          </button>
        </div>
      </form>
    </>
  );
};

export default Signup;
