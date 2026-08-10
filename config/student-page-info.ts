export type StudentPageInfo = {
  title: string;
  description: string;
};

export const studentPageInfo: Record<
  string,
  StudentPageInfo
> = {
  "/student/dashboard": {
    title: "Dashboard",
    description: "Track your wellness journey",
  },

  "/student/profile": {
    title: "Profile",
    description: "Manage your personal information",
  },

  "/student/chat": {
    title: "AI Counselor",
    description:
      "Your private mental wellness companion",
  },

  "/student/assessment": {
    title: "Assessments",
    description:
      "Understand your mental wellness",
  },

  "/student/appointments": {
    title: "Appointments",
    description:
      "Manage your counseling sessions",
  },

  "/student/reports": {
    title: "Reports",
    description:
      "View your wellness insights",
  },

  "/student/settings": {
    title: "Settings",
    description:
      "Manage your preferences",
  },
};