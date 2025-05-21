"use client";

import { useAuth } from "@/lib/providers/AuthProvider";

const SidebarFooter = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="mt-auto p-4 border-t">
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
