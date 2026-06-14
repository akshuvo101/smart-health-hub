"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import {
  LayoutDashboard,
  Users,
  Shield,
  UserCog,
  Server,
  BarChart3,
  Lock,
  FileText,
  Settings,
  Crown,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/super-admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/super-admin/users",
    icon: Users,
  },
  {
    title: "Admins",
    href: "/super-admin/admins",
    icon: UserCog,
  },
  {
    title: "Roles",
    href: "/super-admin/roles",
    icon: Shield,
  },
  {
    title: "System",
    href: "/super-admin/system",
    icon: Server,
  },
  {
    title: "Analytics",
    href: "/super-admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Security",
    href: "/super-admin/security",
    icon: Lock,
  },
  {
    title: "Audit Logs",
    href: "/super-admin/audit-logs",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/super-admin/settings",
    icon: Settings,
  },
];

export default function SuperAdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:flex lg:flex-col">
      {/* Logo */}

      <div className="border-b border-slate-200 p-6 dark:border-slate-800">
        <Link
          href="/super-admin/dashboard"
          className="flex items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 shadow-lg shadow-orange-500/30">
            <Crown className="h-6 w-6 text-white" />
          </div>

          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">
              Smart HealthHub
            </h2>

            <p className="text-xs text-slate-500">
              Super Admin Portal
            </p>
          </div>
        </Link>
      </div>

      {/* Menu */}

      <div className="flex-1 overflow-y-auto p-4">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          System Control
        </p>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300",
                  active
                    ? "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/20"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                )}
              >
                <Icon className="h-5 w-5" />

                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Card */}

      <div className="p-4">
        <div className="rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-5 text-white">
          <Crown className="mb-3 h-8 w-8" />

          <h3 className="font-semibold">
            System Authority
          </h3>

          <p className="mt-2 text-sm text-white/80">
            Manage platform-wide settings,
            administrators, permissions,
            security, analytics, and audit logs.
          </p>

          <div className="mt-4 text-3xl font-bold">
            Root
          </div>

          <p className="mt-1 text-xs text-white/70">
            Highest Access Level
          </p>
        </div>
      </div>
    </aside>
  );
}