"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/providers/AuthProvider";
import { hasRoutePermission } from "@/lib/utils/permissions";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!hasRoutePermission(pathname, user)) {
      router.push("/dashboard");
    }
  }, [pathname, user, router]);

  return <>{children}</>;
};
