import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has("auth-token");

  if (isAuthenticated) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }

  return null;
}
