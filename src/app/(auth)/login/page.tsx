"use client";

import Image from "next/image";
import { LoginForm } from "@/components/Login/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      <div className="lg:flex lg:w-3/5 md:w-1/2 w-0 items-center justify-center">
        <img
          src="https://plus.unsplash.com/premium_photo-1681487769650-a0c3fbaed85a?q=80&w=3055&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Left Image"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col items-center justify-center lg:w-2/5 md:w-1/2 w-full px-12 py-12 bg-white -mt-12">
        <Image
          src="/assets/images/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="w-24 h-24 mx-auto"
        />
        <h2 className="text-3xl font-bold text-center mb-8">Iniciar sesión</h2>
        <LoginForm />
      </div>
    </div>
  );
}
