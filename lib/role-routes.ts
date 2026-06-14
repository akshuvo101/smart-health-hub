export const ROLE_ROUTES = {
  student: "/student",
  doctor: "/doctor",
  counselor: "/counselor",
  admin: "/admin",
  super_admin: "/super-admin",
} as const;

export const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/auth/callback",
];