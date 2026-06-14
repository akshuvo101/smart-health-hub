"use client";

import Link from "next/link";

import {
  X,
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  MessageSquare,
  FileText,
  Settings,
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

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

export default function MobileSidebar({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      <aside className="absolute left-0 top-0 h-full w-72 bg-white p-4 dark:bg-slate-950">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-bold">
            Admin Panel
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="space-y-2">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                <Icon className="h-5 w-5" />

                {item.label}
              </Link>
            );
          })}
        </div>
      </aside>
    </div>
  );
}