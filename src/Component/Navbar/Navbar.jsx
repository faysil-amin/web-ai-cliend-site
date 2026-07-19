import React from "react";
import { Link, NavLink } from "react-router";
import "./Navbar.css";
import Container from "../Container/Container";
import useAuth from "../../Pages/Auth/useAuth";
import logo from "../../assets/user.png";
import { CgLogOut } from "react-icons/cg";
const Navbar = ({ light, setLight }) => {
  const handleClick = () => {
    if (light) {
      setLight(false);
    } else {
      setLight(true);
    }
  };
  const { user, UserSingOut } = useAuth();
  const handleSingOut = () => {
    UserSingOut()
      .then(() => { })
      .catch(() => { });
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
      {user && (
        <>
          <li>
            <NavLink to={"/mypuschases"}>My Purchases </NavLink>
          </li>
          <li>
            <NavLink to={"/mymodels"}>My Models </NavLink>
          </li>
        </>
      )}
      <li>
        <button
          onClick={() => handleClick()}
          className={`btn ${light ? `bg-white text-black` : `bg-black text-white`}`}
        >
          {light ? `black` : `light`}
        </button>
      </li>
    </>
  );
  return (
    <Container>
      <div>
        <div className="navbar bg-base-100/70 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 border-b border-base-200/50 transition-all duration-300">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden hover:bg-base-200/50 transition-colors mr-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
                className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-50 mt-3 w-56 p-3 shadow-xl border border-base-200 font-semibold gap-1 animate-fade-in"
              >
                {link}
              </ul>
            </div>

            <h1 className="text-xl md:text-2xl font-black tracking-wider bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent cursor-pointer select-none">
              WEB AI
            </h1>
          </div>
          {/* //menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 font-semibold gap-2 text-base-content/80">
              {link}
            </ul>
          </div>

          <div className="navbar-end">
            {user ? (
              <div className="dropdown dropdown-end dropdown-hover">
                {/* Avater border */}
                <div tabIndex={0} role="button" className="avatar cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full ring-2 ring-blue-500 ring-offset-base-100 ring-offset-2 overflow-hidden shadow-md">
                    <img
                      src={user.photoURL || logo}
                      alt="User Profile"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                {/* drop down menu */}
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-2xl z-50 w-72 p-4 shadow-2xl border border-base-200/80 mt-2 gap-2"
                >
                  {/* use info card */}
                  <div className="px-2 py-3 border-b border-base-200 mb-1">
                    <p className="text-xs font-bold text-base-content/50 uppercase tracking-wider">Signed in as</p>
                    <p className="font-bold text-base-content text-base truncate">{user.displayName || "User Name"}</p>
                    <p className="text-sm text-base-content/60 truncate mt-0.5">{user.email}</p>
                  </div>

                  <li className="font-medium hover:bg-base-100">
                    <Link to={"/modelpurchase"} className="flex items-center gap-3 p-3 rounded-xl hover:bg-base-200 transition-colors text-base-content/90">
                      <span>Model Purchase Page</span>
                    </Link>
                  </li>
                  <li className="font-medium hover:bg-base-100">
                    <Link to={"/mymodels"} className="flex items-center gap-3 p-3 rounded-xl hover:bg-base-200 transition-colors text-base-content/90">
                      <span>My Models</span>
                    </Link>
                  </li>

                  <div className="border-t border-base-200 my-1"></div>

                  {/* sing out button */}
                  <li>
                    <button
                      onClick={() => handleSingOut()}
                      className="flex items-center gap-3 p-3 rounded-xl w-full text-error hover:bg-error/10 font-bold transition-all"
                    >
                      <CgLogOut className="text-xl" /> <span>Sign Out</span>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              /* login button */
              <Link
                to={"/login"}
                className="btn btn-primary bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl px-6 border-none shadow-md shadow-blue-500/20 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
