"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

type StudentSidebarContextType = {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  toggleSidebar: () => void;
};

const StudentSidebarContext =
  createContext<StudentSidebarContextType | null>(
    null
  );

export function StudentSidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] =
    useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <StudentSidebarContext.Provider
      value={{
        collapsed,
        setCollapsed,
        toggleSidebar,
      }}
    >
      {children}
    </StudentSidebarContext.Provider>
  );
}

export function useStudentSidebar() {
  const context = useContext(
    StudentSidebarContext
  );

  if (!context) {
    throw new Error(
      "useStudentSidebar must be used inside StudentSidebarProvider"
    );
  }

  return context;
}