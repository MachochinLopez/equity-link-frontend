import { useMemo } from "react";
import { useAuth } from "@/lib/providers/AuthProvider";
import { getMenuItems } from "@/services/menuService";
import { MenuItem } from "@/types/menu";

export function useMenu() {
  const { user } = useAuth();

  const hasPermission = (permission: string): boolean => {
    return user?.permission_names?.includes(permission) ?? false;
  };

  const menuItems: MenuItem[] = useMemo(() => {
    return getMenuItems(undefined, hasPermission);
  }, [user?.permission_names]);

  return {
    menuItems,
    hasPermission,
  };
}
