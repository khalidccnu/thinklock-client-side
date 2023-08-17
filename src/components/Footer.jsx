import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaLinkedin,
  FaSkype,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import Newsletter from "./Newsletter.jsx";

const Footer = () => {
  return (
    <footer className="mt-auto">
      <svg
        className="w-full h-16"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g>
          <use xlinkHref="#gentle-wave" x="50" y="0" fill="#1d313e" />
        </g>
        <g>
          <use xlinkHref="#gentle-wave" x="50" y="6" fill="#10202b" />
        </g>
      </svg>
      <div className={`bg-green-dark-jungle text-white`}>
        <div className="container">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 py-16`}
          >
            <div
              className={`order-3 md:order-none sm:col-span-full lg:col-auto`}
            >
              <p className={`mb-7`}>
                ThinkLock is an education technology company that provides an
                online learning and teaching platform. It was founded in 2023.
              </p>
              <span>
                &copy;ThinkLock {new Date().getFullYear()}. All Rights Reserved.
              </span>
            </div>
            <div className={`flex flex-col lg:justify-self-center`}>
              <span className="text-lg font-semibold text-gray-200 mb-3">
                Customer Service
              </span>
              <Link to="/" className="link link-hover">
                Order Status
              </Link>
              <Link to="/" className="link link-hover">
                Help Desk
              </Link>
              <Link to="/" className="link link-hover">
                Return Center
              </Link>
            </div>
            <div className={`flex flex-col lg:justify-self-center`}>
              <span className="text-lg font-semibold text-gray-200 mb-3">
                Information
              </span>
              <Link to="/" className="link link-hover">
                Terms of Use
              </Link>
              <Link to="/" className="link link-hover">
                Privacy Policy
              </Link>
            </div>
            <div className={`sm:col-span-full md:col-auto`}>
              <span className="text-lg font-semibold text-gray-200">
                Sign Up for Our Newsletter
              </span>
              <p className={`my-3`}>
                Receive weekly newsletter with educational materials, popular
                books and much more!
              </p>
              <div className={`mb-7`}>
                <Newsletter />
              </div>
              <ul className={`flex text-lg space-x-3`}>
                <li
                  className={`hover:text-pink-600 cursor-pointer transition-colors duration-500`}
                >
                  <FaFacebook />
                </li>
                <li
                  className={`hover:text-pink-600 cursor-pointer transition-colors duration-500`}
                >
                  <FaTwitter />
                </li>
                <li
                  className={`hover:text-pink-600 cursor-pointer transition-colors duration-500`}
                >
                  <FaLinkedin />
                </li>
                <li
                  className={`hover:text-pink-600 cursor-pointer transition-colors duration-500`}
                >
                  <FaSkype />
                </li>
                <li
                  className={`hover:text-pink-600 cursor-pointer transition-colors duration-500`}
                >
                  <FaYoutube />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
