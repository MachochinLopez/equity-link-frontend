import React from "react";
import Image from "next/image";

const SidebarHeader = () => {
  return (
    <div className="flex flex-col p-4 bg-white items-center">
      <Image
        src="/assets/images/logo.png"
        alt="Logo"
        width={100}
        height={100}
        className="w-24 h-24 bg-white rounded-full self-center"
      />
      <h2 className="text-3xl font-bold text-center">Facturas</h2>
    </div>
  );
};

export default SidebarHeader;
