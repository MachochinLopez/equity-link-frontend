import { User } from "@/lib/providers/AuthProvider";

export const routePermissions: Record<string, string> = {
  "/invoices": "view-invoices",
  "/users": "view-user-management",
};

export const hasRoutePermission = (
  path: string,
  user: User | null
): boolean => {
  const requiredPermission = routePermissions[path];
  if (!requiredPermission) return true; // Si no hay permiso requerido, permitir acceso
  return user?.permission_names?.includes(requiredPermission) ?? false;
};
