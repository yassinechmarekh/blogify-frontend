import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

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
  return (
    <div className={"container"}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={"/"}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={"/"}>Author</BreadcrumbLink>
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
          <NavLink
            to={"/reader-profile/profile"}
            className={({ isActive }) =>
              `reader-profile-menu ${
                isActive
                  ? "reader-profile-menu-active"
                  : "reader-profile-menu-inactive"
              }`
            }
          >
            Profile
          </NavLink>
          <NavLink
            to={"/reader-profile/account"}
            className={({ isActive }) =>
              `reader-profile-menu ${
                isActive
                  ? "reader-profile-menu-active"
                  : "reader-profile-menu-inactive"
              }`
            }
          >
            Account
          </NavLink>
          <NavLink
            to={"/reader-profile/comments"}
            className={({ isActive }) =>
              `reader-profile-menu ${
                isActive
                  ? "reader-profile-menu-active"
                  : "reader-profile-menu-inactive"
              }`
            }
          >
            Comments
          </NavLink>
          <NavLink
            to={"/reader-profile/liked-posts"}
            className={({ isActive }) =>
              `reader-profile-menu ${
                isActive
                  ? "reader-profile-menu-active"
                  : "reader-profile-menu-inactive"
              }`
            }
          >
            Liked Posts
          </NavLink>
          <NavLink
            to={"/reader-profile/liked-comments"}
            className={({ isActive }) =>
              `reader-profile-menu ${
                isActive
                  ? "reader-profile-menu-active"
                  : "reader-profile-menu-inactive"
              }`
            }
          >
            Liked Comments
          </NavLink>
          <NavLink
            to={"/"}
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
        <div
          className={"w-full lg:w-9/12 xl:w-7/12"}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ReaderProfile;
