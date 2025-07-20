import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import logo from "../../assets/jobs_logo.png";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("successfully signout");
      })
      .catch((error) => {
        console.log("failed to sign out.");
      });
  };
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/">Jobs</NavLink>
      </li>
      <li>
        <NavLink to="/">About</NavLink>
      </li>
    </>
  );
  return (
    <div className=" navbar fixed top-0 left-0 w-full bg-black shadow-md z-50  ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
        <a className="btn btn-ghost text-xl">
          <img src={logo} alt="" />
          <h3 className="text-3xl">Job Portal</h3>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
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
                <button className="btn btn-sm  btn-ghost">
                  {user.displayName}
                </button>
              </li>
              <li>
                <span className="text-sm px-2 text-gray-500">{user.email}</span>
              </li>
              <li>
                <button
                  className="btn  btn-sm btn-ghost"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink to="/signin">
            <button className="btn btn-primary">SignIn</button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
