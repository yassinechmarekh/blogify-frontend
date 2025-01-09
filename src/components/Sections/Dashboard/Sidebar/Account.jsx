import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// Components
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

function Projects({ account, menuActive, setMenuActive }) {

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Account</SidebarGroupLabel>
      <SidebarMenu>
        {account.map((item) => (
          <NavLink
            to={item.url}
            className={({ isActive }) =>
              `${isActive && setMenuActive(item.url)}`
            }
            key={item.name}
          >
            <SidebarMenuItem>
              <SidebarMenuButton
                className={menuActive === item.url && "bg-iris text-white"}
              >
                <item.icon />
                <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </NavLink>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export default Projects;
