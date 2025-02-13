import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Components
import NavMain from "@/components/Sections/Dashboard/Sidebar/Main";
import NavUser from "@/components/Sections/Dashboard/Sidebar/User";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/components/Global/Logo";

// Icons
import { BiSolidCategory } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import { MdArticle } from "react-icons/md";
import { FaComments } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";
import { MdNotificationsActive } from "react-icons/md";

function AppSidebar({ props }) {
  const { user } = useSelector((state) => state.auth);
  const adminMenu = [
    {
      title: "Dashboard",
      url: "/dashboard/admin/home",
      icon: AiFillDashboard,
    },
    {
      title: "Users",
      url: "#",
      icon: FaUsers,
      items: [
        {
          title: "All Users",
          url: "/dashboard/users/all",
        },
        {
          title: "Authors",
          url: "/dashboard/users/authors",
        },
        {
          title: "Readers",
          url: "/dashboard/users/readers",
        },
      ],
    },
    {
      title: "Categories",
      url: "#",
      icon: BiSolidCategory,
      items: [
        {
          title: "All Categories",
          url: "/dashboard/categories/all",
        },
        {
          title: "New Category",
          url: "/dashboard/categories/create",
        },
      ],
    },
    {
      title: "Posts",
      url: "#",
      icon: MdArticle,
      items: [
        {
          title: "All Posts",
          url: "/dashboard/posts/all",
        },
        {
          title: "My Posts",
          url: `/dashboard/${user.username}/posts`,
        },
        {
          title: "New Post",
          url: "/dashboard/posts/create",
        },
        {
          title: "Liked Posts",
          url: `/dashboard/${user.username}/posts/liked`,
        },
      ],
    },
    {
      title: "Comments",
      url: "#",
      icon: FaComments,
      items: [
        {
          title: "All Comments",
          url: "/dashboard/comments/all",
        },
        {
          title: "My Comments",
          url: `/dashboard/${user.username}/comments`,
        },
        {
          title: "Liked Comments",
          url: `/dashboard/${user.username}/comments/liked`,
        },
      ],
    },
    {
      title: "Newsletter",
      url: "/dashboard/newsletter",
      icon: MdNotificationsActive,
    },
    {
      title: "Profile",
      url: `/dashboard/profile/${user.username}`,
      icon: FaUser,
    },
    {
      title: "Account",
      url: `/dashboard/account/${user.username}`,
      icon: MdAccountCircle,
    },
  ];
  const authorMenu = [
    {
      title: "Dashboard",
      url: "/dashboard/author/home",
      icon: AiFillDashboard,
    },
    {
      title: "Posts",
      url: "#",
      icon: MdArticle,
      items: [
        {
          title: "My Posts",
          url: `/dashboard/${user.username}/posts`,
        },
        {
          title: "New Post",
          url: "/dashboard/posts/create",
        },
        {
          title: "Liked Posts",
          url: `/dashboard/${user.username}/posts/liked`,
        },
      ],
    },
    {
      title: "Comments",
      url: "#",
      icon: FaComments,
      items: [
        {
          title: "My Comments",
          url: `/dashboard/${user.username}/comments`,
        },
        {
          title: "Liked Comments",
          url: `/dashboard/${user.username}/comments/liked`,
        },
      ],
    },
    {
      title: "Profile",
      url: `/dashboard/profile/${user.username}`,
      icon: FaUser,
    },
    {
      title: "Account",
      url: `/dashboard/account/${user.username}`,
      icon: MdAccountCircle,
    },
  ];
  const menuItems = user.status === "admin" ? adminMenu : authorMenu;
  const [menuActive, setMenuActive] = useState(null);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="hover:bg-transparent active:bg-transparent focus-visible:ring-0"
        >
          <Logo className={"mx-auto py-1"} />
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={menuItems}
          menuActive={menuActive}
          setMenuActive={setMenuActive}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
