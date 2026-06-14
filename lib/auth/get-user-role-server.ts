import { createClient } from "@/lib/supabase/server";

export async function getUserRoleServer() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("SERVER USER =", user?.email);

  if (!user) {
    return null;
  }

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  console.log("DB ROLE =", data?.role);
  const rawRole = data?.role ?? null;

  if (!rawRole) return null;

  const normalized = String(rawRole)
    .trim()
    .toLowerCase()
    .replace(/[-\s]+/g, "_");

  if (normalized.includes("super") && normalized.includes("admin")) {
    return "super_admin";
  }

  if (normalized === "admin" || normalized === "administrator") {
    return "admin";
  }

  if (normalized.includes("counselor") || normalized.includes("counsellor")) {
    return "counselor";
  }

  if (normalized.includes("doctor") || normalized.includes("physician")) {
    return "doctor";
  }

  if (normalized.includes("student") || normalized.includes("user")) {
    return "student";
  }

  return normalized;
}