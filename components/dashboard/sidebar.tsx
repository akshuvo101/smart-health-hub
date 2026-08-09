"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import {
  LayoutDashboard,
  BrainCircuit,
  ClipboardCheck,
  Calendar,
  BarChart3,
  Settings,
  Heart,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    href: "/student/profile",
    icon: LayoutDashboard,
  },
  {
    title: "AI Counselor",
    href: "/student/chat",
    icon: BrainCircuit,
  },
  {
    title: "Assessments",
    href: "/student/assessment/questions",
    icon: ClipboardCheck,
  },
  {
    title: "Appointments",
    href: "/student/appointments",
    icon: Calendar,
  },
  {
    title: "Reports",
    href: "/student/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/student/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:flex lg:flex-col">
      {/* Logo */}
      <div className="border-b border-slate-200 p-6 dark:border-slate-800">
        <Link
          href="/student/dashboard"
          className="flex items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-lg shadow-emerald-500/30">
            <Heart className="h-6 w-6 text-white" />
          </div>

          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">
              PsycoMentalHub
            </h2>

            <p className="text-xs text-slate-500">
              Student Portal
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
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
                  "relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300",
                  active
                    ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25 scale-[1.02]"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                )}
              >
                {/* Active Indicator */}
                {active && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white" />
                )}

                <Icon
                  className={clsx(
                    "h-5 w-5 shrink-0 transition-transform duration-300",
                    active ? "scale-110" : "group-hover:scale-110"
                  )}
                />

                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Card */}
      <div className="p-4">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-5 text-white shadow-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/20 p-3">
              <Heart className="h-6 w-6" />
            </div>

            <div>
              <h3 className="font-semibold">
                Daily Wellness
              </h3>

              <p className="text-sm text-white/80">
                Complete today's assessment to keep your wellness journey on track.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>Today's Progress</span>

              <span className="font-semibold">
                87%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-[87%] rounded-full bg-white transition-all duration-500" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}