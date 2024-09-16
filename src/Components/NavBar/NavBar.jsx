import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { userToken, setUserToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Track the current route

  useEffect(() => {
    // Scroll to the top whenever the route changes
    window.scrollTo(0, 0);
  }, [location]);

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
    setIsOpen(false);
  }

  function signOut() {
    setUserToken("");
    localStorage.removeItem("token");
    navigate("/login");
  }
  function close() {
    setIsOpen(false);
  }
  return (
    <>
      <div className="fixed flex items-center justify-between py-3 px-8 bg-white dark:bg-gray-800 shadow-md w-full overflow-hidden z-[990] top-0">
        <div className="NavBrand me-10 ">
          <Link to={""} className="text-3xl font-bold text-main ">
            <i className="fa-solid fa-cart-shopping"></i> FreshCart
          </Link>
        </div>
       
          <div className="hidden xl:block">
            <ul className="links flex items-center md:space-x-4 lg:space-x-8">
              <li>
                <NavLink to={""} className="">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={"products"} className="">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to={"categories"} className="">
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink to={"brands"} className="">
                  Brands
                </NavLink>
              </li>

              <li>
                <NavLink to={"wishList"} className="">
                  Wish List
                </NavLink>
              </li>
              <li>
                <NavLink to={"cart"} className="">
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink to={"allorders"} className="">
                  Orders
                </NavLink>
              </li>
            </ul>
          </div>
        
        <div className="hidden xl:flex md:ms-2 md:me-2 lg:m-0 social-icons space-x-2 text-main dark:text-white">
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
          <ul className="hidden xl:flex space-x-3 justify-center items-center">
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
              <li className=" text-center p-2 rounded text-white bg-main hover:bg-thrid hover:text-main">
                <button onClick={signOut}>SignOut</button>
              </li>
            )}
            <li>
              <button
                onClick={toggleDarkMode}
                className=" dark:text-gray-400  "
              >
                {darkMode ? (
                  <i className="fa-solid fa-moon  hover:bg-gray-300 px-2 py-1 rounded text-xl"></i>
                ) : (
                  <i className="fa-solid fa-sun hover:bg-gray-100 px-2 py-1 rounded text-xl"></i>
                )}
              </button>
            </li>
          </ul>
        </div>
        <div className="xl:hidden">
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
            ? "mobile-menu bg-[#F4D9D0] dark:bg-gray-700 mt-14 p-1 xl:hidden z-50 fixed w-full top-0 "
            : "mobile-menu hidden xl:hidden"
        }
      >
        <ul className="space-y-4 text-center">
          
            <>
              <li onClick={close}>
                <NavLink to={""} className="">
                  Home
                </NavLink>
              </li>
              <li onClick={close}>
                <NavLink to={"products"} className="">
                  Products
                </NavLink>
              </li>
              <li onClick={close}>
                <NavLink to={"categories"} className="">
                  Categories
                </NavLink>
              </li>
              <li onClick={close}>
                <NavLink to={"brands"} className="">
                  Brands
                </NavLink>
              </li>

              <li onClick={close}>
                <NavLink to={"wishList"} className="">
                  Wish List
                </NavLink>
              </li>
              <li onClick={close}>
                <NavLink to={"cart"} className="">
                  Cart
                </NavLink>
              </li>
              <li onClick={close}>
                <NavLink to={"allorders"} className="">
                  Orders
                </NavLink>
              </li>
            </>
          
          <div className="flex flex-col justify-center items-center  ">
            {!userToken && (
              <>
                <li
                  onClick={close}
                  className="w-1/5 p-1 my-2 text-center  rounded bg-main hover:bg-thrid hover:text-main"
                >
                  <Link to={"login"}>Login</Link>
                </li>
                <li
                  onClick={close}
                  className="w-1/5 p-1 my-2 text-center  rounded bg-main hover:bg-thrid hover:text-main"
                >
                  <Link to={"register"}>Register</Link>
                </li>
              </>
            )}
            {userToken && (
              <li
                onClick={close}
                className="w-auto text-center py-1 px-4 rounded text-white bg-main hover:bg-thrid hover:text-main"
              >
                <button onClick={signOut}>SignOut</button>
              </li>
            )}
          </div>
          <li className="w-7 dark:text-gray-400 hover:bg-gray-200 p-1 rounded-lg text-lg mx-auto">
            <button onClick={toggleDarkMode} className="text-dark  ">
              {darkMode ? (
                <i className="fa-solid fa-moon"></i>
              ) : (
                <i className="fa-solid fa-sun"></i>
              )}
            </button>
          </li>
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
