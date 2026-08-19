// import { createClient } from "@/lib/supabase/server";

// export async function getUserRoleServer() {
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   console.log("SERVER USER =", user?.email);

//   if (!user) {
//     return null;
//   }

//   const { data } = await supabase
//     .from("profiles")
//     .select("role")
//     .eq("id", user.id)
//     .single();

//   console.log("DB ROLE =", data?.role);
//   const rawRole = data?.role ?? null;

//   if (!rawRole) return null;

//   const normalized = String(rawRole)
//     .trim()
//     .toLowerCase()
//     .replace(/[-\s]+/g, "_");

//   if (normalized.includes("super") && normalized.includes("admin")) {
//     return "super_admin";
//   }

//   if (normalized === "admin" || normalized === "administrator") {
//     return "admin";
//   }

//   if (normalized.includes("counselor") || normalized.includes("counsellor")) {
//     return "counselor";
//   }

//   if (normalized.includes("doctor") || normalized.includes("physician")) {
//     return "doctor";
//   }

//   if (normalized.includes("student") || normalized.includes("user")) {
//     return "student";
//   }

//   return normalized;
// }


import { createClient } from "@/lib/supabase/server";

export async function getUserRoleServer() {
  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  console.log("=================================");
  console.log("SERVER USER =", user?.email);
  console.log("SERVER USER ID =", user?.id);
  console.log("AUTH ERROR =", authError);
  console.log("=================================");

  if (authError || !user) {
    console.error(
      "getUserRoleServer: User authentication failed",
      authError
    );

    return null;
  }

  // Get user's role from profiles
  const { data, error: roleError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  console.log("=================================");
  console.log("PROFILE ROLE DATA =", data);
  console.log("PROFILE ROLE ERROR =", roleError);
  console.log("=================================");

  if (roleError) {
    console.error(
      "getUserRoleServer: Failed to fetch user role:",
      roleError
    );

    return null;
  }

  if (!data?.role) {
    console.error(
      "getUserRoleServer: No role found for user:",
      user.id
    );

    return null;
  }

  const rawRole = data.role;

  const normalized = String(rawRole)
    .trim()
    .toLowerCase()
    .replace(/[-\s]+/g, "_");

  console.log("RAW ROLE =", rawRole);
  console.log("NORMALIZED ROLE =", normalized);

  if (
    normalized.includes("super") &&
    normalized.includes("admin")
  ) {
    return "super_admin";
  }

  if (
    normalized === "admin" ||
    normalized === "administrator"
  ) {
    return "admin";
  }

  if (
    normalized.includes("counselor") ||
    normalized.includes("counsellor")
  ) {
    return "counselor";
  }

  if (
    normalized.includes("doctor") ||
    normalized.includes("physician")
  ) {
    return "doctor";
  }

  if (
    normalized.includes("student") ||
    normalized.includes("user")
  ) {
    return "student";
  }

  return normalized;
}