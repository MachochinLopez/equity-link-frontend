import React from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarItem from "./SidebarItem";
import SidebarFooter from "./SidebarFooter";

const Sidebar = () => {
  const menuItems = [
    { href: "/dashboard", label: "Facturas" },
    { href: "/dashboard/profile", label: "Usuarios" },
  ];

  return (
    <aside className="bg-primary w-64 min-h-screen shadow-md flex flex-col">
      <SidebarHeader />
      <nav className="mt-4">
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
