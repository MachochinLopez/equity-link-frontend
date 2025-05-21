"use client";

import { useAuth } from "@/lib/providers/AuthProvider";

const SidebarFooter = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="p-4 bg-white/10">
      <p className="text-sm text-white">Usuario:</p>
      <p className="text-sm text-white">{user?.name}</p>
      <button
        onClick={handleLogout}
        className="w-full px-4 py-2 text-left text-white hover:bg-white/10 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default SidebarFooter;
