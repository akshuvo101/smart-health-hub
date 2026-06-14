"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import {
  LayoutDashboard,
  HeartPulse,
  Moon,
  Activity,
  ClipboardCheck,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
  Shield,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Mood Tracker",
    href: "/student/mood",
    icon: HeartPulse,
  },
  {
    title: "Sleep Tracker",
    href: "/student/sleep",
    icon: Moon,
  },
  {
    title: "Habits",
    href: "/student/habits",
    icon: Activity,
  },
  {
    title: "Assessments",
    href: "/student/assessments",
    icon: ClipboardCheck,
  },
  {
    title: "Appointments",
    href: "/student/appointments",
    icon: Calendar,
  },
  {
    title: "Community Forum",
    href: "/student/forum",
    icon: MessageSquare,
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
            <HeartPulse className="h-6 w-6 text-white" />
          </div>

          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">
              Smart HealthHub
            </h2>

            <p className="text-xs text-slate-500">
              Student Portal
            </p>
          </div>
        </Link>
      </div>

      {/* Menu */}

      <div className="flex-1 overflow-y-auto p-4">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Main Menu
        </p>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300",
                  active
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20"
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
        <div className="rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-5 text-white">
          <Shield className="mb-3 h-8 w-8" />

          <h3 className="font-semibold">
            Wellness Score
          </h3>

          <p className="mt-2 text-sm text-white/80">
            Track your wellness journey and maintain healthy habits.
          </p>

          <div className="mt-4 text-3xl font-bold">
            87%
          </div>
        </div>
      </div>
    </aside>
  );
}