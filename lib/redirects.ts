export function getDashboardRoute(
  role: string
) {
  switch (role) {
    case "admin":
      return "/admin/dashboard";

    case "super_admin":
      return "/super-admin/dashboard";

    case "doctor":
      return "/doctor/dashboard";

    case "counselor":
      return "/counselor/dashboard";

    default:
      return "/student/dashboard";
  }
}