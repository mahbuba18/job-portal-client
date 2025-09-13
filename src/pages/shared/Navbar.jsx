import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import logo from "../../assets/jobs_logo.png";
import { LuLogIn } from "react-icons/lu";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const [scroll, setScroll] = useState(false);

  //for dark or light mode
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Add scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    signOutUser()
      .then(() => console.log("Successfully signed out"))
      .catch(() => console.log("Failed to sign out"));
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/findJobs">Find Jobs</NavLink>
      </li>
      <li>
        <NavLink to="/addJob">Upload Job</NavLink>
      </li>
      <li>
        <a href="#about">About Us</a>
      </li>
    </>
  );

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        scroll ? "bg-black bg-opacity-90 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="navbar px-4 py-3">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <h3 className="text-3xl font-bold">Job Portal</h3>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="navbar-end gap-3">
          <label
            className="cursor-pointer text-3xl  transition-all duration-300 ease-in-out hover:scale-110"
            onClick={handleToggle}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </label>

          {user?.email ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user.photoURL} alt={user.displayName} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52"
              >
                <li>
                  <button className="btn btn-sm btn-ghost">
                    {user.displayName}
                  </button>
                </li>
                <li>
                  <span className="text-sm px-2 text-gray-500">
                    {user.email}
                  </span>
                </li>
                <li>
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink to="/signin">
              <button className="btn bg-gradient-to-r from-blue-500 to-purple-500 flex items-center gap-1">
                <LuLogIn /> Sign In
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
