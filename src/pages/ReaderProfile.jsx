import React from "react";
import { Link, NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/apiCalls/authApiCalls";

// Componenets
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function ReaderProfile() {
  const { username } = useParams();
  const menu = [
    {
      name: "profile",
      url: `/${username}/profile`,
    },
    {
      name: "account",
      url: `/${username}/account`,
    },
    {
      name: "comments",
      url: `/${username}/comments`,
    },
    {
      name: "liked posts",
      url: `/${username}/liked-posts`,
    },
    {
      name: "liked comments",
      url: `/${username}/liked-comments`,
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <div className={"container"}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={"/"}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={"/"} className={'capitalize'}>{username}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Profile</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className={"py-4 border-b border-gray-300"}>
        <h1 className={"text-3xl text-space-cadet font-semibold capitalize"}>
          Settings
        </h1>
        <p className={"mt-1"}>
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <div className={"mt-6 flex lg:flex-row flex-col gap-4"}>
        <div
          className={
            "flex flex-row flex-wrap lg:flex-col w-fit lg:w-3/12 text-xs sm:text-sm lg:text-base"
          }
        >
          {menu.map((item, index) => (
            <NavLink
              to={item.url}
              className={({ isActive }) =>
                `reader-profile-menu ${
                  isActive
                    ? "reader-profile-menu-active"
                    : "reader-profile-menu-inactive"
                }`
              }
              key={index}
            >
              {item.name}
            </NavLink>
          ))}
          <NavLink
            to={'/'}
            onClick={logoutHandler}
            className={({ isActive }) =>
              `reader-profile-menu ${
                isActive
                  ? "reader-profile-menu-active"
                  : "reader-profile-menu-inactive"
              }`
            }
          >
            Logout
          </NavLink>
        </div>
        <div className={"w-full lg:w-9/12 xl:w-7/12"}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ReaderProfile;
