import React from "react";
import { Link, NavLink } from "react-router-dom";
// Components
import Logo from "./Logo";
import BgOverlay from "./BgOverlay";
// Icons
import { IoClose } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

function MenuMobile({ menuOpen, setmenuOpen }) {
  return (
    <>
      {menuOpen && <BgOverlay close={() => setmenuOpen(false)} />}
      <div
        className={`bg-background p-6 fixed top-0 bottom-0 ${
          menuOpen ? "left-0" : "left-[-150%]"
        } w-full xs:w-72 flex flex-col justify-between border-r my-transition z-50`}
      >
        <div className={"flex items-center justify-between"}>
          <Logo />
          <IoClose
            size={28}
            className={"text-space-cadet opacity-80 hover:opacity-100"}
            onClick={() => setmenuOpen(false)}
          />
        </div>
        <nav className="flex-1 my-6 flex flex-col gap-2">
          <ul className={"leading-8"}>
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `capitalize text-space-cadet ${
                    isActive ? "font-semibold" : "font-medium"
                  }`
                }
              >
                home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/categories"}
                className={({ isActive }) =>
                  `capitalize text-space-cadet ${
                    isActive ? "font-semibold" : "font-medium"
                  }`
                }
              >
                categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/posts"}
                className={({ isActive }) =>
                  `capitalize text-space-cadet ${
                    isActive ? "font-semibold" : "font-medium"
                  }`
                }
              >
                posts
              </NavLink>
            </li>
          </ul>
          <div className={"flex gap-2 mt-2"}>
            <Link to={'/register'} className={"signup-btn"}>Sign Up</Link>
            <Link to={'/login'} className={"login-btn"}>Login</Link>
          </div>
        </nav>
        <ul
          className={"pt-4 flex justify-center gap-3 border-t border-slate-300"}
        >
          <li>
            <FaFacebook size={24} className={"icon-list"} />
          </li>
          <li>
            <FaXTwitter size={24} className={"icon-list"} />
          </li>
          <li>
            <FaInstagram size={24} className={"icon-list"} />
          </li>
          <li>
            <FaLinkedin size={24} className={"icon-list"} />
          </li>
        </ul>
      </div>
    </>
  );
}

export default MenuMobile;
