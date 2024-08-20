

import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { userToken, setUserToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setDarkMode(savedMode === "true");
      document.documentElement.classList.toggle("dark", savedMode === "true");
    }
  }, []);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
    localStorage.setItem("darkMode", !darkMode);
  }

  function signOut() {
    setUserToken("");
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <div className="fixed flex items-center justify-between py-3 px-8 bg-white dark:bg-gray-800 shadow-md w-full overflow-hidden z-[990] top-0">
        <div className="NavBrand me-10 ">
          <Link to={""} className="text-3xl font-bold text-main ">
            <i className="fa-solid fa-cart-shopping"></i> FreshCart
          </Link>
        </div>
        {userToken && (
          <div className="hidden md:block">
            <ul className="links flex items-center md:space-x-4 lg:space-x-8">
              <li>
                <NavLink to={""} className="">Home</NavLink>
              </li>
              <li>
                <NavLink to={"products"} className="">Products</NavLink>
              </li>
              <li>
                <NavLink to={"categories"} className="">Categories</NavLink>
              </li>
              <li>
                <NavLink to={"brands"} className="">Brands</NavLink>
              </li>
              <li>
                <NavLink to={"cart"} className="">Cart</NavLink>
              </li>
              <li>
                <NavLink to={"wishList"} className="">Wish List</NavLink>
              </li>
            </ul>
          </div>
        )}
        <div className="hidden md:flex md:ms-2 md:me-2 lg:m-0 social-icons space-x-2 text-main dark:text-white">
          <Link to={""}>
            <i className="fa-brands fa-facebook hover:opacity-75 dark:hover:text-main dark:hover:opacity-100"></i>
          </Link>
          <Link to={""}>
            <i className="fa-brands fa-instagram hover:opacity-75 dark:hover:text-main dark:hover:opacity-100"></i>
          </Link>
          <Link to={""}>
            <i className="fa-brands fa-twitter hover:opacity-75 dark:hover:text-main dark:hover:opacity-100"></i>
          </Link>
          <Link to={""}>
            <i className="fa-brands fa-youtube hover:opacity-75 dark:hover:text-main dark:hover:opacity-100"></i>
          </Link>
          <Link to={""}>
            <i className="fa-brands fa-linkedin hover:opacity-75 dark:hover:text-main dark:hover:opacity-100"></i>
          </Link>
          <Link to={""}>
            <i className="fa-brands fa-tiktok hover:opacity-75 dark:hover:text-main dark:hover:opacity-100"></i>
          </Link>
        </div>
        <div>
          <ul className="hidden md:flex space-x-3 justify-center items-center">
            {!userToken && (
              <>
                <li className="text-center p-2 rounded text-white bg-main hover:bg-thrid hover:text-main">
                  <Link to={"login"}>Login</Link>
                </li>
                <li className="text-center p-2 rounded text-white bg-main hover:bg-thrid hover:text-main">
                  <Link to={"register"}>Register</Link>
                </li>
              </>
            )}
            {userToken && (
              <li className="text-center p-2 rounded text-white bg-main hover:bg-thrid hover:text-main">
                <button onClick={signOut}>SignOut</button>
              </li>
            )}
            <li>
              <button
                onClick={toggleDarkMode}
                className=" dark:text-gray-400 hover:bg-gray-200 p-2 rounded-xl text-xl"
              >
                {darkMode ? (
                  <i className="fa-solid fa-moon"></i>
                ) : (
                  <i className="fa-solid fa-sun"></i>
                )}
              </button>
            </li>
          </ul>
        </div>
        <div className="md:hidden">
          <button
            className="mobile-menu-button border-2 border-gray-300 rounded p-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-7 h-6 text-gray-700 dark:text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      <div
        className={
          isOpen
            ? "mobile-menu bg-[#F4D9D0] dark:bg-gray-700 mt-14 p-1 md:hidden"
            : "mobile-menu hidden md:hidden"
        }
      >
        <ul className="space-y-4">
          {userToken && (
            <>
              <li>
                <NavLink to={""} className="">Home</NavLink>
              </li>
              <li>
                <NavLink to={"products"} className="">Products</NavLink>
              </li>
              <li>
                <NavLink to={"categories"} className="">Categories</NavLink>
              </li>
              <li>
                <NavLink to={"brands"} className="">Brands</NavLink>
              </li>
              <li>
                <NavLink to={"cart"} className="">Cart</NavLink>
              </li>
              <li>
                <NavLink to={"wishList"} className="">Wish List</NavLink>
              </li>
            </>
          )}
          <div className="flex flex-row space-x-2">
            {!userToken && (
              <>
                <li className="w-1/6 text-center p-1 rounded bg-main hover:bg-thrid hover:text-main">
                  <Link to={"login"}>Login</Link>
                </li>
                <li className="w-1/6 text-center p-1 rounded bg-main hover:bg-thrid hover:text-main">
                  <Link to={"register"}>Register</Link>
                </li>
              </>
            )}
            {userToken && (
              <li className="w-1/6 text-center p-1 rounded bg-main hover:bg-thrid hover:text-main">
                <button onClick={signOut}>SignOut</button>
              </li>
            )}
            <li className=" dark:text-gray-400 hover:bg-gray-200 p-1 rounded-lg text-lg">
              <button
                onClick={toggleDarkMode}
                className="text-dark  "
              >
                {darkMode ? (
                  <i className="fa-solid fa-moon"></i>
                ) : (
                  <i className="fa-solid fa-sun"></i>
                )}
              </button>
            </li>
          </div>
          <div className="space-x-2 text-main dark:text-white">
            <Link to={""}>
              <i className="fa-brands fa-facebook hover:opacity-75 dark:hover:text-main"></i>
            </Link>
            <Link to={""}>
              <i className="fa-brands fa-instagram hover:opacity-75 dark:hover:text-main"></i>
            </Link>
            <Link to={""}>
              <i className="fa-brands fa-twitter hover:opacity-75 dark:hover:text-main"></i>
            </Link>
            <Link to={""}>
              <i className="fa-brands fa-youtube hover:opacity-75 dark:hover:text-main"></i>
            </Link>
            <Link to={""}>
              <i className="fa-brands fa-linkedin hover:opacity-75 dark:hover:text-main"></i>
            </Link>
            <Link to={""}>
              <i className="fa-brands fa-tiktok hover:opacity-75 dark:hover:text-main"></i>
            </Link>
          </div>
        </ul>
      </div>
    </>
  );
}


