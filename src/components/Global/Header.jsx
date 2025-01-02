import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

// Components
import Logo from "./Logo";
import SearchCard from "./SearchCard";
import MenuMobile from "./MenuMobile";

// Icons
import { IoSearch } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";

function Header() {
  const [seachOpen, setSearchOpen] = useState(false);
  const [menuOpen, setmenuOpen] = useState(false);
  return (
    <header className="py-3 relative">
      <div className="container">
        <div className="flex items-center justify-between">
          <LuMenu
            size={25}
            className={"md:hidden text-space-cadet"}
            onClick={() => setmenuOpen(true)}
          />
          <Logo />
          <ul className={"hidden md:flex gap-1"}>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `py-1 px-4 rounded-lg capitalize font-medium hover:bg-slate-200 my-transition ${
                  isActive ? "bg-slate-200" : ""
                }`
              }
            >
              home
            </NavLink>
            <NavLink
              to={"/categories"}
              className={({ isActive }) =>
                `py-1 px-4 rounded-lg capitalize font-medium hover:bg-slate-200 my-transition ${
                  isActive ? "bg-slate-200" : ""
                }`
              }
            >
              categories
            </NavLink>
            <NavLink
              to={"/posts"}
              className={({ isActive }) =>
                `py-1 px-4 rounded-lg capitalize font-medium hover:bg-slate-200 my-transition ${
                  isActive ? "bg-slate-200" : ""
                }`
              }
            >
              posts
            </NavLink>
          </ul>
          <div className={"flex items-center gap-2"}>
            <span className={"py-1 px-4 md:border-r-2"}>
              <IoSearch
                size={20}
                className={"hover:opacity-50 cursor-pointer my-transition"}
                onClick={() => setSearchOpen(true)}
              />
            </span>
            <Link to={"/login"} className={"hidden md:block login-btn"}>
              Login
            </Link>
            <Link to={"/register"} className={"hidden md:block signup-btn"}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      {seachOpen && <SearchCard setSearchOpen={setSearchOpen} />}
      <MenuMobile menuOpen={menuOpen} setmenuOpen={setmenuOpen} />
    </header>
  );
}

export default Header;
