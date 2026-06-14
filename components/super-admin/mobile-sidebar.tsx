"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  UserCog,
  Shield,
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

export default function SuperAdminMobileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Menu Button */}

      <button
        onClick={() => setOpen(true)}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          bg-white
          text-slate-700
          transition-all
          hover:bg-slate-100
          dark:border-slate-800
          dark:bg-slate-900
          dark:text-slate-200
          dark:hover:bg-slate-800
          lg:hidden
        "
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed
            inset-0
            z-40
            bg-black/50
            backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      {/* Drawer */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          h-screen
          w-72
          border-r
          border-slate-200
          bg-white
          transition-transform
          duration-300
          dark:border-slate-800
          dark:bg-slate-950
          lg:hidden

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
          <Link
            href="/super-admin/dashboard"
            className="flex items-center gap-3"
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-r
                from-amber-500
                via-orange-500
                to-red-500
              "
            >
              <Crown className="h-5 w-5 text-white" />
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

          <button
            onClick={() => setOpen(false)}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              hover:bg-slate-100
              dark:hover:bg-slate-800
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}

        <nav className="p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.href ||
                pathname.startsWith(
                  `${item.href}/`
                );

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    px-4
                    py-3
                    text-sm
                    font-medium
                    transition-all

                    ${
                      active
                        ? `
                          bg-gradient-to-r
                          from-amber-500
                          via-orange-500
                          to-red-500
                          text-white
                          shadow-lg
                        `
                        : `
                          text-slate-700
                          hover:bg-slate-100
                          dark:text-slate-300
                          dark:hover:bg-slate-800
                        `
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />

                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}