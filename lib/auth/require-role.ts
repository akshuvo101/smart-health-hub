
import { redirect } from "next/navigation";
import { getUserRoleServer } from "./get-user-role-server";

export async function requireRole(
  allowedRoles: string[]
) {
  const role = await getUserRoleServer();

  console.log("ROLE =", role);
  console.log("ALLOWED =", allowedRoles);

  if (!role) {
    console.log("NO ROLE FOUND");
    redirect("/login");
  }

  if (!allowedRoles.includes(role)) {
    console.log("ROLE NOT ALLOWED");
    redirect("/");
  }

  return role;
}