"use client";

import React from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarItem from "./SidebarItem";
import SidebarFooter from "./SidebarFooter";
import { useMenu } from "@/hooks/useMenu";

const Sidebar = () => {
  const { menuItems } = useMenu();

  return (
    <aside className="bg-primary w-64 h-fulll shadow-md flex flex-col">
      <SidebarHeader />
      <nav className="mt-4 p-5 flex-grow">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <SidebarItem key={item.href} href={item.href} label={item.label} />
          ))}
        </ul>
      </nav>
      <SidebarFooter />
    </aside>
  );
};

export default Sidebar;
