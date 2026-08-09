"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Bell,
  Menu,
  Search,
  ChevronDown,
  Home,
  LogOut,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import ThemeToggle from "@/components/theme-toggle";
import MobileSidebar from "./mobile-sidebar";

const supabase = createClient();
export default function AdminHeader() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [openMenu, setOpenMenu] =
    useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setOpenMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  };

  return (
    <>
      <MobileSidebar
        open={open}
        onClose={() => setOpen(false)}
      />

      <header
        className="
          sticky
          top-0
          z-30
          border-b
          border-slate-200
          bg-white/80
          backdrop-blur-xl
          dark:border-slate-800
          dark:bg-slate-950/80
        "
      >
        <div className="flex h-20 items-center justify-between px-6">
          {/* Left */}

          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(true)}
              className="
                rounded-xl
                border
                border-slate-200
                p-2
                lg:hidden
                dark:border-slate-800
              "
            >
              <Menu className="h-5 w-5" />
            </button>

            <div>
              <h1 className="text-xl font-bold">
                Admin Dashboard
              </h1>

              <p className="text-sm text-slate-500">
                Manage wellness platform
              </p>
            </div>
          </div>

          {/* Search */}

          <div className="hidden lg:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Search users, reports, appointments..."
                className="
                  w-80
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  py-3
                  pl-11
                  pr-4
                  outline-none
                  transition-all
                  focus:border-indigo-500
                  dark:border-slate-800
                  dark:bg-slate-900
                "
              />
            </div>
          </div>

          {/* Right */}

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Notifications */}

            <button
              className="
                relative
                rounded-2xl
                border
                border-slate-200
                p-3
                transition-all
                hover:bg-slate-100
                dark:border-slate-800
                dark:hover:bg-slate-900
              "
            >
              <Bell className="h-5 w-5" />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {/* Profile Dropdown */}

            <div
              className="relative"
              ref={menuRef}
            >
              <button
                onClick={() =>
                  setOpenMenu(!openMenu)
                }
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  px-3
                  py-2
                  transition-all
                  hover:bg-slate-50
                  hover:shadow-md
                  dark:border-slate-800
                  dark:bg-slate-900
                  dark:hover:bg-slate-800
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-indigo-500
                    to-purple-500
                    font-semibold
                    text-white
                  "
                >
                  AD
                </div>

                <div className="hidden text-left md:block">
                  <p className="text-sm font-semibold">
                    Administrator
                  </p>

                  <p className="text-xs text-slate-500">
                    Admin
                  </p>
                </div>

                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform ${
                    openMenu
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {openMenu && (
                <div
                  className="
                    absolute
                    right-0
                    mt-3
                    w-64
                    overflow-hidden
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    shadow-2xl
                    dark:border-slate-800
                    dark:bg-slate-900
                  "
                >
                  <div className="border-b border-slate-200 p-4 dark:border-slate-800">
                    <p className="font-semibold">
                      Administrator
                    </p>

                    <p className="text-sm text-slate-500">
                      Admin Portal
                    </p>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={() =>
                        router.push("/")
                      }
                      className="
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-2xl
                        px-4
                        py-3
                        text-sm
                        transition-all
                        hover:bg-slate-100
                        dark:hover:bg-slate-800
                      "
                    >
                      <Home className="h-4 w-4" />
                      Home Page
                    </button>

                    <button
                      onClick={handleLogout}
                      className="
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-2xl
                        px-4
                        py-3
                        text-sm
                        text-red-500
                        transition-all
                        hover:bg-red-50
                        dark:hover:bg-red-500/10
                      "
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}