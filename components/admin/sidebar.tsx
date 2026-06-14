"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  MessageSquare,
  FileText,
  Settings,
  Shield,
} from "lucide-react";

const links = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Counselors",
    href: "/admin/counselors",
    icon: UserCheck,
  },
  {
    label: "Appointments",
    href: "/admin/appointments",
    icon: Calendar,
  },
  {
    label: "Forum",
    href: "/admin/forum",
    icon: MessageSquare,
  },
  {
    label: "Reports",
    href: "/admin/reports",
    icon: FileText,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:flex lg:flex-col">
      {/* Logo */}

      <div className="border-b border-slate-200 p-6 dark:border-slate-800">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg">
            <Shield className="h-6 w-6" />
          </div>

          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">
              Smart HealthHub
            </h2>

            <p className="text-xs text-slate-500">
              Admin Panel
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 p-4">
        {links.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all ${
                active
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
              }`}
            >
              <Icon className="h-5 w-5" />

              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}

      <div className="border-t border-slate-200 p-4 dark:border-slate-800">
        <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-900">
          <p className="text-sm font-semibold">
            Administrator
          </p>

          <p className="text-xs text-slate-500">
            Full Access Enabled
          </p>
        </div>
      </div>
    </aside>
  );
} 