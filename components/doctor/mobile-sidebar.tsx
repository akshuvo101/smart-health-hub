"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  CalendarDays,
  ClipboardCheck,
  BarChart3,
  Bot,
  FileText,
  Settings,
  Stethoscope,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/doctor/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Patients",
    href: "/doctor/patients",
    icon: Users,
  },
  {
    title: "Appointments",
    href: "/doctor/appointments",
    icon: CalendarDays,
  },
  {
    title: "Assessments",
    href: "/doctor/assessments",
    icon: ClipboardCheck,
  },
  {
    title: "Reports",
    href: "/doctor/reports",
    icon: BarChart3,
  },
  {
    title: "AI Assistant",
    href: "/doctor/ai-assistant",
    icon: Bot,
  },
  {
    title: "Prescriptions",
    href: "/doctor/prescriptions",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/doctor/settings",
    icon: Settings,
  },
];

export default function DoctorMobileSidebar() {
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
          top-0
          left-0
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
            href="/doctor/dashboard"
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
                from-blue-500
                via-cyan-500
                to-indigo-500
              "
            >
              <Stethoscope className="h-5 w-5 text-white" />
            </div>

            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                Smart HealthHub
              </h2>

              <p className="text-xs text-slate-500">
                Doctor Portal
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
                          from-blue-500
                          via-cyan-500
                          to-indigo-500
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

        {/* Bottom Card */}

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="rounded-3xl bg-gradient-to-br from-blue-500 via-cyan-500 to-indigo-500 p-5 text-white">
            <h3 className="font-semibold">
              Doctor Portal
            </h3>

            <p className="mt-2 text-sm text-white/80">
              Access patients, appointments,
              prescriptions, and AI-powered
              healthcare insights.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}