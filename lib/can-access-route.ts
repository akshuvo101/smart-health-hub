export function canAccessRoute(
  role: string,
  pathname: string
) {
  switch (role) {
    case "super_admin":
      return true;

    case "admin":
      return pathname.startsWith("/admin");

    case "doctor":
      return pathname.startsWith("/doctor");

    case "counselor":
      return pathname.startsWith("/counselor");

    case "student":
      return pathname.startsWith("/student");

    default:
      return false;
  }
}