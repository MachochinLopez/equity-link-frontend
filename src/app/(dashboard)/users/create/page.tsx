"use client";

import { CreateUserForm } from "@/components/users/CreateUserForm";

export default function CreateUserPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Crear Usuario</h1>
      <div className="max-w-2xl">
        <CreateUserForm />
      </div>
    </div>
  );
}
