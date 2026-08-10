"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { studentPageInfo } from "@/config/student-page-info";
import {
  Bell,
  Search,
  ChevronDown,
  Home,
  LogOut,
  Sparkles,
  UserRound,
} from "lucide-react";

import ThemeToggle from "@/components/theme-toggle";
import MobileSidebar from "./mobile-sidebar";
import { createClient } from "@/lib/supabase/client";

export default function Header() {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();

  const [userName, setUserName] =
    useState("Loading...");

  const [userRole, setUserRole] =
    useState("Student");

  const [userAvatar, setUserAvatar] =
    useState<string | null>(null);

  const [openMenu, setOpenMenu] =
    useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  /* =========================================
     USER
  ========================================== */

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
          "Student"
      );

      setUserRole(
        user.user_metadata?.role ||
          "Student"
      );

      setUserAvatar(
        user.user_metadata?.avatar_url ||
          user.user_metadata?.picture ||
          null
      );
    };

    getUser();
  }, [supabase]);

  /* =========================================
     CLICK OUTSIDE
  ========================================== */

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

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* =========================================
     ESCAPE KEY
  ========================================== */

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setOpenMenu(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  /* =========================================
     LOGOUT
  ========================================== */

  const handleLogout = async () => {
    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  };

  /* =========================================
     PAGE TITLE
  ========================================== */


  const currentPage =
    Object.entries(studentPageInfo).find(
      ([path]) =>
        pathname === path ||
        pathname.startsWith(`${path}/`)
    )?.[1] || {
      title: "Student Dashboard",
      description:
        "Track your wellness journey",
    };

  /* =========================================
     RENDER
  ========================================== */

  return (
    <header
      className="
        sticky
        top-0
        z-40
        px-3
        pt-3
        sm:px-4
        lg:px-5
      "
    >
      <div
        className="
          flex
          min-h-[68px]
          items-center
          justify-between
          gap-3
          rounded-[22px]
          border
          border-slate-200/70
          bg-white/85
          px-3
          shadow-sm
          shadow-slate-900/[0.03]
          backdrop-blur-2xl
          transition-all
          dark:border-slate-800/80
          dark:bg-slate-950/80
          dark:shadow-black/10
          sm:px-4
          lg:min-h-[72px]
          lg:px-5
        "
      >
        {/* =====================================
            LEFT
        ====================================== */}

        <div className="flex min-w-0 items-center gap-3">
          {/* Mobile Menu */}

          <MobileSidebar />

          {/* Page Context */}

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1
                className="
                  truncate
                  text-base
                  font-bold
                  tracking-tight
                  text-slate-900
                  sm:text-lg
                  lg:text-xl
                  dark:text-white
                "
              >
                {currentPage.title}
              </h1>

              {/* Small Status */}

              <span
                className="
                  hidden
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-emerald-500
                  shadow-[0_0_8px_rgba(16,185,129,0.6)]
                  sm:block
                "
              />
            </div>

            <p
              className="
                hidden
                truncate
                text-xs
                text-slate-500
                sm:block
                lg:text-[13px]
                dark:text-slate-400
              "
            >
              {currentPage.description}
            </p>
          </div>
        </div>

        {/* =====================================
            SEARCH
        ====================================== */}

        <div
          className="
            hidden
            flex-1
            justify-center
            px-4
            lg:flex
          "
        >
          <div className="relative w-full max-w-md">
            <Search
              className="
                absolute
                left-4
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              placeholder="Search your dashboard..."
              className="
                h-11
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-slate-50/80
                pl-11
                pr-12
                text-sm
                text-slate-900
                outline-none
                placeholder:text-slate-400
                transition-all
                focus:border-emerald-400
                focus:bg-white
                focus:ring-4
                focus:ring-emerald-500/10
                dark:border-slate-800
                dark:bg-slate-900/70
                dark:text-white
                dark:focus:border-emerald-600
                dark:focus:bg-slate-900
              "
            />

            {/* Keyboard shortcut */}

            <span
              className="
                absolute
                right-3
                top-1/2
                hidden
                -translate-y-1/2
                rounded-lg
                border
                border-slate-200
                bg-white
                px-2
                py-1
                text-[9px]
                font-medium
                text-slate-400
                xl:block
                dark:border-slate-700
                dark:bg-slate-800
              "
            >
              ⌘ K
            </span>
          </div>
        </div>

        {/* =====================================
            RIGHT ACTIONS
        ====================================== */}

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Theme */}

          <ThemeToggle />

          {/* Notification */}

          <button
            type="button"
            aria-label="Notifications"
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-600
              transition-all
              duration-200
              hover:scale-105
              hover:border-emerald-200
              hover:bg-emerald-50
              hover:text-emerald-600
              dark:border-slate-800
              dark:bg-slate-900
              dark:text-slate-300
              dark:hover:border-emerald-900
              dark:hover:bg-emerald-950/40
              dark:hover:text-emerald-400
            "
          >
            <Bell className="h-[18px] w-[18px]" />

            <span
              className="
                absolute
                right-1.5
                top-1.5
                h-2
                w-2
                rounded-full
                bg-emerald-500
                ring-2
                ring-white
                dark:ring-slate-900
              "
            />
          </button>

          {/* =================================
              PROFILE
          ================================= */}

          <div
            ref={menuRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() =>
                setOpenMenu((prev) => !prev)
              }
              className="
                group
                flex
                h-10
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-1.5
                pr-2
                transition-all
                duration-200
                hover:border-emerald-200
                hover:shadow-md
                dark:border-slate-800
                dark:bg-slate-900
                dark:hover:border-emerald-900
              "
            >
              {/* Avatar */}

              {userAvatar ? (
                <Image
                  src={userAvatar}
                  alt={userName}
                  width={36}
                  height={36}
                  className="
                    h-9
                    w-9
                    rounded-[10px]
                    object-cover
                    ring-2
                    ring-emerald-500/20
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-[10px]
                    bg-gradient-to-br
                    from-emerald-500
                    via-teal-500
                    to-cyan-500
                    text-sm
                    font-bold
                    text-white
                    shadow-sm
                  "
                >
                  {userName
                    .charAt(0)
                    .toUpperCase()}
                </div>
              )}

              {/* User info */}

              <div className="hidden text-left xl:block">
                <p
                  className="
                    max-w-[100px]
                    truncate
                    text-xs
                    font-semibold
                    text-slate-900
                    dark:text-white
                  "
                >
                  {userName}
                </p>

                <p
                  className="
                    text-[10px]
                    capitalize
                    text-slate-400
                  "
                >
                  {userRole}
                </p>
              </div>

              <ChevronDown
                className={`
                  hidden
                  h-3.5
                  w-3.5
                  text-slate-400
                  transition-transform
                  duration-200
                  xl:block
                  ${
                    openMenu
                      ? "rotate-180"
                      : ""
                  }
                `}
              />
            </button>

            {/* =================================
                DROPDOWN
            ================================= */}

            {openMenu && (
              <div
                className="
                  absolute
                  right-0
                  top-[calc(100%+10px)]
                  z-50
                  w-64
                  origin-top-right
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-slate-200/80
                  bg-white
                  shadow-[0_20px_60px_rgba(15,23,42,0.15)]
                  animate-in
                  fade-in
                  zoom-in-95
                  duration-200
                  dark:border-slate-800
                  dark:bg-slate-950
                  dark:shadow-black/40
                "
              >
                {/* User Header */}

                <div
                  className="
                    relative
                    overflow-hidden
                    border-b
                    border-slate-200
                    p-4
                    dark:border-slate-800
                  "
                >
                  <div
                    className="
                      absolute
                      -right-8
                      -top-8
                      h-20
                      w-20
                      rounded-full
                      bg-emerald-500/10
                      blur-2xl
                    "
                  />

                  <div className="relative flex items-center gap-3">
                    {userAvatar ? (
                      <Image
                        src={userAvatar}
                        alt={userName}
                        width={42}
                        height={42}
                        className="h-[42px] w-[42px] rounded-xl object-cover"
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-[42px]
                          w-[42px]
                          items-center
                          justify-center
                          rounded-xl
                          bg-gradient-to-br
                          from-emerald-500
                          to-cyan-500
                          font-bold
                          text-white
                        "
                      >
                        {userName
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p
                        className="
                          truncate
                          text-sm
                          font-semibold
                          text-slate-900
                          dark:text-white
                        "
                      >
                        {userName}
                      </p>

                      <div className="mt-0.5 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                        <p className="text-[11px] capitalize text-slate-400">
                          {userRole}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu */}

                <div className="p-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenMenu(false);
                      router.push(
                        "/student/profile"
                      );
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-xs
                      font-medium
                      text-slate-600
                      transition-colors
                      hover:bg-slate-100
                      hover:text-slate-900
                      dark:text-slate-300
                      dark:hover:bg-slate-900
                      dark:hover:text-white
                    "
                  >
                    <UserRound className="h-4 w-4" />

                    My Profile
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOpenMenu(false);
                      router.push("/");
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-xs
                      font-medium
                      text-slate-600
                      transition-colors
                      hover:bg-slate-100
                      hover:text-slate-900
                      dark:text-slate-300
                      dark:hover:bg-slate-900
                      dark:hover:text-white
                    "
                  >
                    <Home className="h-4 w-4" />

                    Home Page
                  </button>

                  <div className="my-1.5 h-px bg-slate-100 dark:bg-slate-800" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-xs
                      font-medium
                      text-red-500
                      transition-colors
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