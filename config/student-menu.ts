import {
  LayoutDashboard,
  UserRound,
  BrainCircuit,
  ClipboardCheck,
  Calendar,
  BarChart3,
  Settings,
} from "lucide-react";

export const menuItems = [
  {
    title: "Dashboard",
    href: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    href: "/student/profile",
    icon: UserRound,
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