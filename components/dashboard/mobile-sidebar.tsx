"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  Menu,
  X,
  LayoutDashboard,
  ClipboardCheck,
  Calendar,
  BarChart3,
  Settings,
  BrainCircuit,
  HeartPulse,
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
    title: "Assessment",
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

export default function MobileSidebar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Menu Button */}

      <button
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay */}

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300 lg:hidden ${open
            ? "visible opacity-100"
            : "invisible opacity-0"
          }`}
      />

      {/* Drawer */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950 lg:hidden ${open
            ? "translate-x-0"
            : "-translate-x-full"
          }`}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
          <Link
            href="/student/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-lg shadow-emerald-500/30">
              <HeartPulse className="h-5 w-5 text-white" />
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

          <button
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}

        <div className="flex-1 overflow-y-auto p-4">
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Navigation
          </p>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${active
                      ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/20"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                    }`}
                >
                  {active && (
                    <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-white" />
                  )}

                  <Icon
                    className={`h-5 w-5 shrink-0 transition-transform ${active ? "scale-110" : ""
                      }`}
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
                <Heart className="h-5 w-5" />
              </div>

              <div>
                <h3 className="font-semibold">
                  Daily Wellness
                </h3>

                <p className="text-xs text-white/80">
                  Complete today's assessment to keep your wellness journey on track.
                </p>
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span>Today's Progress</span>

                <span className="font-semibold">
                  87%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/20">
                <div className="h-full w-[87%] rounded-full bg-white" />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}