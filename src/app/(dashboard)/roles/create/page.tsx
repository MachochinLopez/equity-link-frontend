"use client";

import { CreateRoleForm } from "@/components/roles/CreateRoleForm";

export default function CreateRolePage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Crear Rol</h1>
      <div className="max-w-2xl">
        <CreateRoleForm />
      </div>
    </div>
  );
}
