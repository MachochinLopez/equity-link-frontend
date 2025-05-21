import React from "react";

interface SidebarItemProps {
  href: string;
  label: string;
}

const SidebarItem = ({ href, label }: SidebarItemProps) => {
  return (
    <li>
      <a href={href} className="block px-4 py-2 text-white hover:bg-white/10">
        {label}
      </a>
    </li>
  );
};

export default SidebarItem;
