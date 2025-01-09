import React, { useState } from "react";

// Components
import NavMain from "@/components/Sections/Dashboard/Sidebar/Main";
import NavAccount from "@/components/Sections/Dashboard/Sidebar/Account";
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

function AppSidebar({ props }) {
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "https://github.com/shadcn.png",
    },
    navMain: [
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
            url: "/dashboard/username/posts",
          },
          {
            title: "New Post",
            url: "/dashboard/posts/create",
          },
          {
            title: "Liked Posts",
            url: "/dashboard/username/posts/liked",
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
            url: "/dashboard/username/comments",
          },
          {
            title: "Liked Comments",
            url: "/dashboard/username/comments/liked",
          },
        ],
      },
    ],
    account: [
      {
        name: "Profile",
        url: "/dashboard/profile/username",
        icon: FaUser,
      },
      {
        name: "Account",
        url: "/dashboard/account/username",
        icon: MdAccountCircle,
      },
    ],
  };
  const [menuActive, setMenuActive] = useState(null);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="hover:bg-transparent"
        >
          <Logo className={"mx-auto py-1"} />
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} menuActive={menuActive} setMenuActive={setMenuActive} />
        <NavAccount account={data.account} menuActive={menuActive} setMenuActive={setMenuActive} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
