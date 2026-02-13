import React from "react";
import { Link, NavLink } from "react-router";
import "./Navbar.css";
import Container from "../Container/Container";
import useAuth from "../../Pages/Auth/useAuth";
import logo from "../../assets/user.png";
import { CgLogOut } from "react-icons/cg";
const Navbar = () => {
  const { user, UserSingOut } = useAuth();
  const handleSingOut = () => {
    UserSingOut()
      .then(() => {})
      .catch(() => {});
  };
  const link = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/addmodel"}>Add Model</NavLink>
      </li>
      <li>
        <NavLink to={"/allmodels"}>All Models</NavLink>
      </li>
    </>
  );
  return (
    <Container>
      <div>
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="font-bold menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {link}
              </ul>
            </div>
            <h1 className="text-base md:text-2xl font-bold">WEB AI</h1>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="font-bold menu menu-horizontal px-1">{link}</ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className=" m-1">
                  {user.photoURL === null ? (
                    <img
                      className="md:h-15 md:w-15 h-10 w-10 border-2 p-1 border-blue-600 rounded-[50%]"
                      src={logo}
                    ></img>
                  ) : (
                    <img
                      className="border-2 h-10 w-10 border-blue-600 p-1 md:h-15 md:w-15 rounded-[50%]"
                      src={user.photoURL}
                    ></img>
                  )}
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-65 p-2 shadow-sm right-0"
                >
                  <li>
                    <p>
                      <span className="font-bold">Name: </span>
                      <span>{user.displayName}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="font-bold">Email: </span>
                      <span>{user.email}</span>
                    </p>
                  </li>
                  <li>
                    <a onClick={() => handleSingOut()}>
                      <p className="flex items-center gap-2 font-bold">
                        <CgLogOut /> <span> SingOut</span>
                      </p>
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <button className="btn btn-outline btn-primary px-6">
                {" "}
                <Link to={"/login"}>LogIn</Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
