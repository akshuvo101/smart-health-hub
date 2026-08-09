import { createClient } from "@/lib/supabase/client";


export async function getUserRole() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (error || !data?.role) {
    // console.error(error);
    return "student";
  }

  const rawRole = data?.role ?? "student";

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