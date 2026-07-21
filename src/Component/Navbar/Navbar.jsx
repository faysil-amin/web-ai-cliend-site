import React from "react";
import { Link, NavLink } from "react-router";
import "./Navbar.css";
import Container from "../Container/Container";
import useAuth from "../../Pages/Auth/useAuth";
import logo from "../../assets/user.png";
import { CgLogOut } from "react-icons/cg";
import { HiOutlineBars3BottomRight, HiOutlineSun, HiOutlineMoon, HiSparkles } from "react-icons/hi2";
import { TbShoppingBag, TbBox, TbChevronDown } from "react-icons/tb";

const Navbar = ({ light, setLight }) => {
  const handleClick = () => {
    setLight(!light);
  };

  const { user, UserSingOut } = useAuth();

  const handleSingOut = () => {
    UserSingOut()
      .then(() => { })
      .catch(() => { });
  };

  // Ultra-modern dynamic NavLink style
  const navLinkClass = ({ isActive }) =>
    `relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 group ${isActive
      ? "text-red-600 dark:text-yellow-400 bg-red-50/80 dark:bg-red-950/20 shadow-sm"
      : "text-base-content/70 hover:text-base-content hover:bg-base-200/50"
    }`;

  const link = (
    <>
      <li>
        <NavLink to={"/"} className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to={"/addmodel"} className={navLinkClass}>
          Add Model
        </NavLink>
      </li>
      <li>
        <NavLink to={"/allmodels"} className={navLinkClass}>
          All Models
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to={"/mypuschases"} className={navLinkClass}>
              My Purchases
            </NavLink>
          </li>
          <li>
            <NavLink to={"/mymodels"} className={navLinkClass}>
              My Models
            </NavLink>
          </li>
        </>
      )}
      {/* Modern Theme Switcher */}
      <li className="flex items-center ml-2">
        <button
          onClick={handleClick}
          className={`relative p-2 rounded-xl text-xs font-bold transition-all duration-300 border flex items-center gap-2 shadow-sm active:scale-90 ${light
              ? "bg-slate-900 text-amber-400 border-slate-800 hover:shadow-slate-900/20"
              : "bg-amber-50 text-amber-600 border-amber-200 hover:shadow-amber-500/20"
            }`}
          title="Toggle Theme"
        >
          {light ? (
            <>
              <HiOutlineMoon className="text-base animate-pulse" />
              <span className="hidden sm:inline">Dark</span>
            </>
          ) : (
            <>
              <HiOutlineSun className="text-base text-amber-500 animate-spin-slow" />
              <span className="hidden sm:inline text-slate-800">Light</span>
            </>
          )}
        </button>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-50 px-2 sm:px-4 pt-2">
      <Container>
        <div className="navbar bg-base-100/70 backdrop-blur-2xl border border-base-200/80 rounded-2xl shadow-lg shadow-base-300/10 px-3 md:px-6 transition-all duration-300">

          {/* Left Section: Mobile Menu & Brand */}
          <div className="navbar-start gap-3">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle lg:hidden hover:bg-base-200/80 transition-colors"
              >
                <HiOutlineBars3BottomRight className="w-6 h-6 text-base-content" />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100/95 backdrop-blur-2xl rounded-2xl z-[1] mt-3 w-64 p-3 shadow-2xl border border-base-200/80 font-medium gap-1.5 animate-in fade-in slide-in-from-top-3 duration-200"
              >
                {link}
              </ul>
            </div>

            {/* 🔥 Red & Yellow Glowing Brand Logo 🔥 */}
            <Link to="/" className="flex items-center gap-2.5 group py-1">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 via-red-500 to-yellow-400 flex items-center justify-center text-white shadow-md shadow-red-500/30 group-hover:scale-105 group-hover:shadow-yellow-500/40 transition-all duration-300">
                <HiSparkles className="text-xl text-yellow-100 group-hover:rotate-12 transition-transform" />
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tight bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                WEB AI
              </span>
            </Link>
          </div>

          {/* Center Section: Desktop Links */}
          <div className="navbar-center hidden lg:flex">
            <ul className="flex items-center gap-1 font-medium">{link}</ul>
          </div>

          {/* Right Section: Profile & Auth */}
          <div className="navbar-end gap-3">
            {user ? (
              <div className="dropdown dropdown-end">
                {/* Profile Trigger Button */}
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-base-200/60 transition-all duration-200 group border border-transparent hover:border-base-200"
                >
                  <div className="avatar">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full ring-2 ring-red-500/50 ring-offset-2 ring-offset-base-100 overflow-hidden shadow-sm group-hover:ring-yellow-500 transition-all">
                      <img
                        src={user.photoURL || logo}
                        alt="User Profile"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <TbChevronDown className="text-base-content/50 text-sm group-hover:rotate-180 transition-transform duration-300 hidden sm:block" />
                </div>

                {/* Profile Dropdown Menu */}
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100/95 backdrop-blur-2xl rounded-3xl z-[1] w-72 p-3 shadow-2xl border border-base-200/80 mt-3 gap-1 animate-in fade-in slide-in-from-top-3 duration-200"
                >
                  {/* User Profile Card */}
                  <div className="relative overflow-hidden p-3.5 bg-gradient-to-br from-red-500/10 via-yellow-500/5 to-transparent rounded-2xl mb-1 border border-red-500/10">
                    <span className="text-[10px] font-extrabold text-red-600 dark:text-yellow-400 uppercase tracking-widest px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 inline-block mb-1.5">
                      Active User
                    </span>
                    <p className="font-bold text-base-content text-sm truncate">
                      {user.displayName || "User Name"}
                    </p>
                    <p className="text-xs text-base-content/60 truncate font-medium mt-0.5">
                      {user.email}
                    </p>
                  </div>

                  <li>
                    <Link
                      to={"/modelpurchase"}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold hover:bg-base-200/70 transition-colors text-base-content/80 hover:text-base-content"
                    >
                      <TbShoppingBag className="text-lg text-red-500" />
                      <span>Model Purchase Page</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/mymodels"}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold hover:bg-base-200/70 transition-colors text-base-content/80 hover:text-base-content"
                    >
                      <TbBox className="text-lg text-amber-500" />
                      <span>My Models</span>
                    </Link>
                  </li>

                  <div className="border-t border-base-200/80 my-1"></div>

                  {/* Sign Out Button */}
                  <li>
                    <button
                      onClick={handleSingOut}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-error hover:bg-error/10 transition-colors w-full"
                    >
                      <CgLogOut className="text-lg" />
                      <span>Sign Out</span>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              /* Red & Yellow Gradient Login Button */
              <Link
                to={"/login"}
                className="btn btn-sm md:btn-md bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 hover:opacity-95 text-white font-bold rounded-xl px-6 border-none shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-200 active:scale-95"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;