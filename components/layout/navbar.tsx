"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, HeartPulse, LogOut, User, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { getDashboardRoute } from "@/lib/redirects";

import Container from "./container";
import ThemeToggle from "../theme-toggle";
import { createClient } from "@/lib/supabase/client";

const navLinks = [
  {
    label: "Features",
    href: "/features",
  },
  {
    label: "How It Works",
    href: "/#how-it-works",
  },
  {
    label: "Resources",
    href: "/resources",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const supabase = createClient();
  const router = useRouter();
  const [dashboardRoute, setDashboardRoute] = useState("/student/dashboard");

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [user, setUser] = useState<any>(null);

  const [userName, setUserName] = useState("");

  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      setUser(session.user);

      setUserName(
        session.user.user_metadata?.full_name ||
          session.user.user_metadata?.name ||
          "User",
      );

      setUserAvatar(
        session.user.user_metadata?.avatar_url ||
          session.user.user_metadata?.picture ||
          null,
      );

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (data?.role) {
        setDashboardRoute(getDashboardRoute(data.role));
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        setUserName(
          session.user.user_metadata?.full_name ||
            session.user.user_metadata?.name ||
            "User",
        );

        setUserAvatar(
          session.user.user_metadata?.avatar_url ||
            session.user.user_metadata?.picture ||
            null,
        );

        const { data } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (data?.role) {
          setDashboardRoute(getDashboardRoute(data.role));
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();

    router.push("/");
    router.refresh();
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-emerald-500/10 bg-white/80 shadow-lg shadow-emerald-500/5 backdrop-blur-xl dark:bg-slate-950/80"
          : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}

          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-lg shadow-emerald-500/30 transition-all duration-300 group-hover:scale-110">
              <HeartPulse className="h-6 w-6 text-white" />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                PsychoMentalHub
              </h1>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                AI Wellness Platform
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-700 transition-colors duration-300 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right */}

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />

            {!user ? (
              <>
                <Link
                  href="/login"
                  className="rounded-xl px-5 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-1"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                >
                  {userAvatar ? (
                    <Image
                      src={userAvatar}
                      alt={userName}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 font-semibold text-white">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <span className="font-medium text-slate-700 dark:text-white">
                    {userName}
                  </span>

                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
                    <Link
                      href={dashboardRoute}
                      className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <User className="h-4 w-4" />
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            className="border-t border-emerald-500/10 bg-white/95 backdrop-blur-xl dark:bg-slate-950/95 lg:hidden"
          >
            <Container>
              <div className="flex flex-col gap-2 py-6">
                <ThemeToggle />

                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 dark:text-slate-300"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="mt-4 flex flex-col gap-3">
                  {!user ? (
                    <>
                      <Link
                        href="/login"
                        className="rounded-xl border border-slate-200 px-4 py-3 text-center"
                      >
                        Login
                      </Link>

                      <Link
                        href="/register"
                        className="rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-4 py-3 text-center font-semibold text-white"
                      >
                        Get Started
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href={dashboardRoute}
                        className="rounded-xl border border-slate-200 px-4 py-3 text-center"
                      >
                        Dashboard
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="rounded-xl border border-red-200 px-4 py-3 text-red-500"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
