import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimesCircle } from "react-icons/fa";
import useAuth from "../hooks/useAuth.js";

const Nav = () => {
  const { loading, userInfo } = useAuth();
  const [hbMenu, setHbMenu] = useState(true);
  const [sm, setSM] = useState(true);
  const collapseHbMenu = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const handleResize = (_) => {
    if (innerWidth >= 640) {
      setHbMenu(false);
      setSM(false);
    } else {
      setHbMenu(true);
      setSM(true);
    }
  };

  const handleCollapseHbMenu = ({ target: elem }) => {
    innerWidth < 640
      ? !collapseHbMenu.current.contains(elem) ||
        elem.classList.contains("nav-link")
        ? setHbMenu(true)
        : null
      : null;
  };

  useEffect(() => {
    addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleCollapseHbMenu);

    handleResize();

    return () => {
      removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleCollapseHbMenu);
    };
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 bg-sky-50 w-full py-2 z-30"
      ref={collapseHbMenu}
    >
      <div className="relative container">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src="/lg-thinklock.svg" alt="" className="w-[5rem]" />
          </Link>
          <div className="flex flex-row-reverse sm:flex-row items-center sm:space-x-5">
            {!sm ? (
              <ul className="flex space-x-3">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      "p-2 rounded transition-colors duration-500 " +
                      (isActive
                        ? "bg-pink-600 text-white"
                        : "hover:bg-pink-600 hover:text-white")
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/instructor"
                    className={({ isActive }) =>
                      "p-2 rounded transition-colors duration-500 " +
                      (isActive
                        ? "bg-pink-600 text-white"
                        : "hover:bg-pink-600 hover:text-white")
                    }
                  >
                    Instructor
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/course"
                    className={({ isActive }) =>
                      "p-2 rounded transition-colors duration-500 " +
                      (isActive
                        ? "bg-pink-600 text-white"
                        : "hover:bg-pink-600 hover:text-white")
                    }
                  >
                    Course
                  </NavLink>
                </li>
                {userInfo ? (
                  <li>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        "p-2 rounded transition-colors duration-500 " +
                        (isActive
                          ? "bg-pink-600 text-white"
                          : "hover:bg-pink-600 hover:text-white")
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                ) : null}
              </ul>
            ) : (
              <span
                className="sm:hidden ml-5 text-[#e87425] hover:text-pink-600 cursor-pointer"
                onClick={(_) => setHbMenu(!hbMenu)}
              >
                {hbMenu ? (
                  <FaBars className="h-6" />
                ) : (
                  <FaTimesCircle className="h-6" />
                )}
              </span>
            )}
            {!loading ? (
              location.pathname !== "/login" && !userInfo ? (
                <button
                  className="btn btn-xs btn-outline text-pink-600 border-pink-600 min-w-[8rem] hover:bg-pink-600 hover:border-pink-600 transition-colors duration-500"
                  onClick={(_) => navigate("/login")}
                >
                  Log In
                </button>
              ) : location.pathname !== "/dashboard" && userInfo ? (
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={userInfo.photoURL}
                      alt=""
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              ) : null
            ) : null}
          </div>
        </div>
        {sm ? (
          <div
            className={`absolute ${
              hbMenu ? "-top-52 max-h-0" : "top-12 max-h-96"
            } left-0 w-full overflow-hidden transition-[max-height] duration-500`}
          >
            <ul className="flex flex-col bg-sky-50 px-6 pt-8 pb-5 space-y-3">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    "nav-link block px-2 py-1 rounded transition-colors duration-500 " +
                    (isActive
                      ? "bg-pink-600 text-white"
                      : "hover:bg-pink-600 hover:text-white")
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/instructor"
                  className={({ isActive }) =>
                    "nav-link block px-2 py-1 rounded transition-colors duration-500 " +
                    (isActive
                      ? "bg-pink-600 text-white"
                      : "hover:bg-pink-600 hover:text-white")
                  }
                >
                  Instructor
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/course"
                  className={({ isActive }) =>
                    "nav-link block px-2 py-1 rounded transition-colors duration-500 " +
                    (isActive
                      ? "bg-pink-600 text-white"
                      : "hover:bg-pink-600 hover:text-white")
                  }
                >
                  Course
                </NavLink>
              </li>
              {userInfo ? (
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      "nav-link block px-2 py-1 rounded transition-colors duration-500 " +
                      (isActive
                        ? "bg-pink-600 text-white"
                        : "hover:bg-pink-600 hover:text-white")
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              ) : null}
            </ul>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Nav;
