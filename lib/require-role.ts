import { redirect } from "next/navigation";
import { getUserRole } from "./get-user-role";



export async function requireRole(
  allowedRoles: string[]
) {
  const role = await getUserRole();

  if (!role) {
    redirect("/login");
  }

  if (!allowedRoles.includes(role)) {
    redirect("/");
  }

  return role;
}