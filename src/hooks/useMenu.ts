import { useMemo } from "react";
import { useAuth } from "@/lib/providers/AuthProvider";
import { getMenuItems } from "@/services/menuService";
import { MenuItem } from "@/types/menu";

export function useMenu() {
  const { user } = useAuth();

  const hasPermission = useMemo(() => {
    return (permission: string): boolean => {
      return user?.permission_names?.includes(permission) ?? false;
    };
  }, [user?.permission_names]);

  const menuItems: MenuItem[] = useMemo(() => {
    return getMenuItems(undefined, hasPermission);
  }, [hasPermission]);

  return {
    menuItems,
    hasPermission,
  };
}
