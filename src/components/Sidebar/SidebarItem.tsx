import React from "react";

interface SidebarItemProps {
  href: string;
  label: string;
}

const SidebarItem = ({ href, label }: SidebarItemProps) => {
  return (
    <li>
      <a
        href={href}
        className="block px-6 py-3 text-white hover:bg-white/10 rounded-lg"
      >
        {label}
      </a>
    </li>
  );
};

export default SidebarItem;
