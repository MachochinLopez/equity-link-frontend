import { MenuItem, MenuConfig } from "@/types/menu";

export const defaultMenuConfig: MenuConfig = {
  items: [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/invoices", label: "Facturas", permission: "view-invoices" },
    { href: "/users", label: "Usuarios", permission: "view-user-management" },
    {
      href: "/users/create",
      label: "Crear Usuario",
      permission: "create-user",
    },
    { href: "/roles", label: "Roles", permission: "list-roles" },
    { href: "/roles/create", label: "Crear Rol", permission: "create-role" },
    { href: "/permissions", label: "Permisos", permission: "list-permissions" },
    {
      href: "/permissions/create",
      label: "Crear Permiso",
      permission: "create-permission",
    },
  ],
};

type PermissionChecker = (permission: string) => boolean;

export const filterMenuItems = (
  items: MenuItem[],
  hasPermission: PermissionChecker
): MenuItem[] => {
  return items.filter((item) => {
    if (!item.permission) return true;
    return hasPermission(item.permission);
  });
};

export const createMenuConfig = (items: MenuItem[]): MenuConfig => ({
  items,
});

export const getMenuItems = (
  config: MenuConfig = defaultMenuConfig,
  hasPermission: PermissionChecker
): MenuItem[] => {
  return filterMenuItems(config.items, hasPermission);
};
