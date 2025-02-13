import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/apiCalls/authApiCalls";

// Components
import Logo from "./Logo";
import SearchCard from "./SearchCard";
import MenuMobile from "./MenuMobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Icons
import { IoSearch } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { MdOutlineLogout } from "react-icons/md";

function Header() {
  const [seachOpen, setSearchOpen] = useState(false);
  const [menuOpen, setmenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  const profileLink = () => {
    if (user?.status === "admin") {
      return "/dashboard/admin/home";
    } else if (user?.status === "author") {
      return "/dashboard/author/home";
    } else {
      return `/${user?.username}/profile`;
    }
  };
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
          <div className={"flex items-center gap-0 sm:gap-2"}>
            <span className={"py-1 px-4 md:border-r-2"}>
              <IoSearch
                size={20}
                className={"hover:opacity-50 cursor-pointer my-transition"}
                onClick={() => setSearchOpen(true)}
              />
            </span>
            {user ? (
              <div className={"flex items-center gap-1 lg:gap-2"}>
                <Link to={profileLink()}>
                  <Avatar className={"w-8 h-8"}>
                    <AvatarImage src={user?.profilePhoto} />
                    <AvatarFallback>{user?.username[0]}</AvatarFallback>
                  </Avatar>
                </Link>
                <div className={"hidden lg:flex flex-col"}>
                  <Link
                    to={profileLink()}
                    className={
                      "text-space-cadet text-sm hover:text-iris hover:underline font-medium capitalize"
                    }
                  >
                    {user?.username}
                  </Link>
                  <span className={"text-xs"}>{user?.email}</span>
                </div>
                <button
                  onClick={logoutHandler}
                  className={"login-btn p-2 hover:text-iris"}
                >
                  <MdOutlineLogout size={22} />
                </button>
              </div>
            ) : (
              <>
                <Link to={"/login"} className={"hidden md:block login-btn"}>
                  Login
                </Link>
                <Link to={"/register"} className={"hidden md:block signup-btn"}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {seachOpen && <SearchCard setSearchOpen={setSearchOpen} />}
      <MenuMobile menuOpen={menuOpen} setmenuOpen={setmenuOpen} />
    </header>
  );
}

export default Header;
