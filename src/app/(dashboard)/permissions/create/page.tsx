"use client";

import { CreatePermissionForm } from "@/components/permissions/CreatePermissionForm";

export default function CreatePermissionPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Crear Permiso</h1>
      <div className="max-w-2xl">
        <CreatePermissionForm />
      </div>
    </div>
  );
}
