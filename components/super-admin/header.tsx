"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  Bell,
  Search,
  ChevronDown,
  Home,
  LogOut,
  Crown,
} from "lucide-react";

import ThemeToggle from "@/components/theme-toggle";
import SuperAdminMobileSidebar from "./mobile-sidebar";
import { supabase } from "@/lib/supabase/client";

export default function SuperAdminHeader() {
  const router = useRouter();

  const [userName, setUserName] =
    useState("Loading...");

  const [userRole, setUserRole] =
    useState("Super Admin");

  const [userAvatar, setUserAvatar] =
    useState<string | null>(null);

  const [openMenu, setOpenMenu] =
    useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return;

      const user = session.user;

      setUserName(
        user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          "Super Admin"
      );

      setUserAvatar(
        user.user_metadata?.avatar_url ||
          user.user_metadata?.picture ||
          null
      );

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (data?.role) {
        setUserRole(data.role);
      }
    };

    getUser();
  }, []);

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
    <header
      className="
        sticky
        top-0
        z-30
        border-b
        border-slate-200/70
        bg-white/80
        backdrop-blur-xl
        dark:border-slate-800/70
        dark:bg-slate-950/80
      "
    >
      <div className="flex h-20 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Left */}

        <div className="flex items-center gap-4">
          <SuperAdminMobileSidebar />

          <div>
            <h1 className="text-lg font-bold text-slate-900 md:text-xl dark:text-white">
              Super Admin Dashboard
            </h1>

            <p className="text-xs text-slate-500 md:text-sm">
              Full platform management &
              infrastructure control
            </p>
          </div>
        </div>

        {/* Search */}

        <div className="hidden w-full max-w-lg px-6 lg:block">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search users, roles, logs, analytics..."
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                py-3
                pl-11
                pr-4
                text-sm
                outline-none
                transition-all
                focus:border-amber-500
                focus:ring-4
                focus:ring-amber-500/10
                dark:border-slate-800
                dark:bg-slate-900
                dark:text-white
              "
            />
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-2 md:gap-3">
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

            <span
              className="
                absolute
                right-2
                top-2
                h-2.5
                w-2.5
                rounded-full
                bg-amber-500
                ring-2
                ring-white
                dark:ring-slate-950
              "
            />
          </button>

          {/* Profile */}

          <div
            className="relative"
            ref={menuRef}
          >
            <button
              onClick={() =>
                setOpenMenu(!openMenu)
              }
              className="
                group
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
              {userAvatar ? (
                <Image
                  src={userAvatar}
                  alt={userName}
                  width={40}
                  height={40}
                  className="
                    h-10
                    w-10
                    rounded-full
                    object-cover
                    ring-2
                    ring-amber-500/20
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-amber-500
                    via-orange-500
                    to-red-500
                    font-semibold
                    text-white
                  "
                >
                  {userName
                    .charAt(0)
                    .toUpperCase()}
                </div>
              )}

              <div className="hidden text-left lg:block">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {userName}
                </p>

                <div className="flex items-center gap-1">
                  <Crown className="h-3 w-3 text-amber-500" />

                  <p className="text-xs capitalize text-slate-500">
                    {userRole}
                  </p>
                </div>
              </div>

              <ChevronDown
                className={`
                  hidden
                  h-4
                  w-4
                  text-slate-400
                  transition-transform
                  lg:block
                  ${
                    openMenu
                      ? "rotate-180"
                      : ""
                  }
                `}
              />
            </button>

            {/* Dropdown */}

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
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {userName}
                  </p>

                  <p className="text-sm capitalize text-slate-500">
                    {userRole}
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
  );
}