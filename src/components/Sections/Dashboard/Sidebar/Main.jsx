import React from "react";
import { NavLink } from "react-router-dom";

// Components
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

// Icons
import { MdKeyboardArrowDown } from "react-icons/md";

function Main({ items, menuActive, setMenuActive }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Features</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) =>
          item.items ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <MdKeyboardArrowDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <NavLink
                          to={subItem.url}
                          className={({ isActive }) =>
                            `${isActive && setMenuActive(subItem.url)}`
                          }
                        >
                          <SidebarMenuSubButton
                            className={
                              menuActive === subItem.url && "bg-iris text-white"
                            }
                          >
                            <span>{subItem.title}</span>
                          </SidebarMenuSubButton>
                        </NavLink>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <NavLink
              key={item.title}
              to={item.url}
              className={({ isActive }) =>
                `${isActive && setMenuActive(item.url)}`
              }
            >
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={
                    menuActive === item.url && "bg-iris text-white"
                  }
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </NavLink>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export default Main;
