"use client";

import { useAuth } from "@/lib/providers/AuthProvider";
import Image from "next/image";
import { Spinner } from "../common/Spinner";

const SidebarFooter = () => {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="p-4 bg-white/10 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="p-4 bg-white/10">
      <div className="flex items-center gap-3 mb-5 px-2">
        <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center">
          <Image
            src="/assets/images/profile.svg"
            alt="Profile"
            width={20}
            height={20}
          />
        </div>
        <p className="text-md text-white pt-1/2">{user?.name}</p>
      </div>
      <hr className="my-2 border-white" />
      <button
        onClick={handleLogout}
        className="w-full px-4 py-2 text-left text-white hover:bg-white/10 hover:cursor-pointer rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default SidebarFooter;
