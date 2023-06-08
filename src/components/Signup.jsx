import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IKContext, IKUpload } from "imagekitio-react";
import toast from "react-hot-toast";
import { FaInfoCircle, FaUpload } from "react-icons/fa";
import useAuth from "../hooks/useAuth.js";

const Signup = () => {
  const { loading, setLoading, createUserWithEP } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
    cfPassword: "",
    name: "",
    phone: "",
    gender: "",
    role: "not set yet",
  });
  const [passVal, setPassVal] = useState(false);
  const [passValWarn, setPassValWarn] = useState({});
  const [firstPhase, setFirstPhase] = useState([]);
  const [nextPhase, setNextPhase] = useState(false);
  const [photo, setPhoto] = useState(null);
  const emailRef = useRef();
  const passwordRef = useRef();
  const cfPasswordRef = useRef();

  const changeInput = ({ target }) => {
    const { name, value } = target;

    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

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

  const ikSuccess = (response) => setPhoto(response);

  const handleNextPhase = (_) => {
    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      toast.error("All fields are required!");
      return false;
    } else if (passwordRef.current.value !== cfPasswordRef.current.value) {
      toast.error("Password and Confirm Password does not match!");
      return false;
    } else if (passwordRef.current.value.length < 6) {
      toast.error("Password should be at least 6 characters long!");
      return false;
    } else if (Object.keys(passValWarn).length < 4) {
      toast.error("Password expression does not match!");
      return false;
    }

    setFirstPhase([emailRef.current.value, passwordRef.current.value]);
    setNextPhase(true);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { name, phone, gender, role } = e.target;

    if (gender.value === "" || role === "not set yet" || !photo) {
      toast.error("All fields are required!");
      return false;
    }

    createUserWithEP(
      ...firstPhase,
      name.value,
      phone.value,
      gender.value,
      role.value,
      photo.url
    )
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
      <h3 className="text-[#e87425] font-bold text-2xl text-center">Signup</h3>
      <form className="form-control mt-5 space-y-4" onSubmit={handleSignup}>
        {!nextPhase ? (
          <>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={input.email}
                className="peer input input-sm input-bordered text-[#e87425] w-full px-3 py-5 rounded focus:outline-none focus:ring-2 focus:ring-[#e87425] valid:ring-2 valid:ring-[#e87425]"
                onChange={changeInput}
                required={true}
                ref={emailRef}
              />
              <label className="absolute top-0 left-0 ml-3 mt-2.5 text-gray-400 peer-focus:-translate-y-1/2 peer-focus:bg-[#e87425] peer-focus:text-white peer-focus:mt-0 peer-focus:px-2 peer-focus:rounded peer-valid:-translate-y-1/2 peer-valid:bg-[#e87425] peer-valid:text-white peer-valid:mt-0 peer-valid:px-2 peer-valid:rounded transition-all duration-300 pointer-events-none">
                Email
              </label>
            </div>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={input.password}
                className="peer input input-sm input-bordered text-[#e87425] w-full px-3 py-5 rounded focus:outline-none focus:ring-2 focus:ring-[#e87425] valid:ring-2 valid:ring-[#e87425]"
                onChange={changeInput}
                onKeyUp={(e) => handlePassword(e.target.value)}
                onFocus={(_) => setPassVal(true)}
                onBlur={(_) => setPassVal(false)}
                required={true}
                ref={passwordRef}
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
                name="cfPassword"
                value={input.cfPassword}
                className="peer input input-sm input-bordered text-[#e87425] w-full px-3 py-5 rounded focus:outline-none focus:ring-2 focus:ring-[#e87425] valid:ring-2 valid:ring-[#e87425]"
                onChange={changeInput}
                required={true}
                ref={cfPasswordRef}
              />
              <label className="absolute top-0 left-0 ml-3 mt-2.5 text-gray-400 peer-focus:-translate-y-1/2 peer-focus:bg-[#e87425] peer-focus:text-white peer-focus:mt-0 peer-focus:px-2 peer-focus:rounded peer-valid:-translate-y-1/2 peer-valid:bg-[#e87425] peer-valid:text-white peer-valid:mt-0 peer-valid:px-2 peer-valid:rounded transition-all duration-300 pointer-events-none">
                Confirm Password
              </label>
            </div>
          </>
        ) : (
          <>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={input.name}
                className="peer input input-sm input-bordered text-[#e87425] w-full px-3 py-5 rounded focus:outline-none focus:ring-2 focus:ring-[#e87425] valid:ring-2 valid:ring-[#e87425]"
                onChange={changeInput}
                required={true}
              />
              <label className="absolute top-0 left-0 ml-3 mt-2.5 text-gray-400 peer-focus:-translate-y-1/2 peer-focus:bg-[#e87425] peer-focus:text-white peer-focus:mt-0 peer-focus:px-2 peer-focus:rounded peer-valid:-translate-y-1/2 peer-valid:bg-[#e87425] peer-valid:text-white peer-valid:mt-0 peer-valid:px-2 peer-valid:rounded transition-all duration-300 pointer-events-none">
                Name
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                name="phone"
                value={input.phone}
                className="peer input input-sm input-bordered text-[#e87425] w-full px-3 py-5 rounded focus:outline-none focus:ring-2 focus:ring-[#e87425] valid:ring-2 valid:ring-[#e87425]"
                onChange={changeInput}
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
                    name="gender"
                    value="male"
                    className="radio radio-sm"
                    onChange={changeInput}
                  />
                  <label htmlFor="male" className="label label-text">
                    Male
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="female"
                    type="radio"
                    name="gender"
                    value="female"
                    className="radio radio-sm"
                    onChange={changeInput}
                  />
                  <label htmlFor="male" className="label label-text">
                    Female
                  </label>
                </div>
              </div>
              <select
                name="role"
                className="select select-sm select-bordered h-auto py-1 rounded focus:outline-0"
                onChange={changeInput}
              >
                <option
                  value="not set yet"
                  selected={input.role === "not set yet" ? "selected" : null}
                  disabled
                >
                  Role
                </option>
                <option value="instructor">Instructor</option>
                <option value="student">Student</option>
              </select>
            </div>
            <IKContext
              publicKey={import.meta.env.VITE_IK_PL_KEY}
              urlEndpoint={`https://ik.imagekit.io/${
                import.meta.env.VITE_IK_ID
              }`}
              authenticationEndpoint={`${import.meta.env.VITE_API_URL}/ik`}
            >
              <IKUpload
                id="photo"
                className="hidden"
                folder={"/thinklock/users"}
                onSuccess={ikSuccess}
              />
              <label
                htmlFor="photo"
                className="btn btn-sm w-full h-auto py-3.5 rounded normal-case"
              >
                {photo ? (
                  photo.name.substring(0, photo.name.lastIndexOf("_"))
                ) : (
                  <>
                    <span>Upload</span>
                    <FaUpload />
                  </>
                )}
              </label>
            </IKContext>
          </>
        )}
        <div>
          <button
            type={!nextPhase ? "button" : "submit"}
            className="btn btn-sm w-full h-auto py-3.5 bg-[#e87425] hover:bg-transparent text-white hover:text-[#e87425] !border-[#e87425] rounded normal-case"
            onClick={!nextPhase ? handleNextPhase : null}
          >
            <span>{!nextPhase ? "Next" : "Signup"}</span>
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
