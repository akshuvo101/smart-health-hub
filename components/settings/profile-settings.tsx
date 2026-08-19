"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    UserRound,
    Mail,
    GraduationCap,
    Building2,
    IdCard,
    BookOpen,
    ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

import { Profile } from "@/types/profile";
import { ApiResponse } from "@/types/api";

export default function ProfileSettings() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        try {
            const response = await fetch("/api/profile");

            const result: ApiResponse<Profile> =
                await response.json();

            if (result.success && result.data) {
                setProfile(result.data);
            } else {
                toast.error(
                    result.message ?? "Unable to load profile."
                );
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load profile.");
        } finally {
            setLoading(false);
        }
    }

    /* Loading */
    if (loading) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="animate-pulse space-y-4">
                    <div className="h-5 w-32 rounded bg-slate-200 dark:bg-slate-800" />

                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-slate-200 dark:bg-slate-800" />

                        <div className="space-y-2">
                            <div className="h-3.5 w-28 rounded bg-slate-200 dark:bg-slate-800" />
                            <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-800" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800" />
                        <div className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800" />
                    </div>
                </div>
            </div>
        );
    }

    /* Profile Not Found */
    if (!profile) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <UserRound className="h-4 w-4" />
                    </div>

                    <div>
                        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                            Profile Information
                        </h2>

                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Unable to load profile.
                        </p>
                    </div>
                </div>

                <Link
                    href="/student/profile"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-xs font-semibold text-white transition hover:shadow-md"
                >
                    Go to Profile
                    <ArrowRight className="h-3.5 w-3.5" />
                </Link>
            </div>
        );
    }

    /* Avatar Initials */
    const initials =
        profile.full_name
            ?.split(" ")
            .filter(Boolean)
            .map((name) => name[0])
            .slice(0, 2)
            .join("")
            .toUpperCase() || "U";

    const information = [
        {
            label: "Email",
            value: profile.email || "Not provided",
            icon: Mail,
        },
        {
            label: "University",
            value: profile.university || "Not provided",
            icon: Building2,
        },
        {
            label: "Department",
            value: profile.department || "Not provided",
            icon: GraduationCap,
        },
        {
            label: "Student ID",
            value: profile.student_id || "Not provided",
            icon: IdCard,
        },
    ];

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                        Profile Information
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        Basic account and academic information.
                    </p>
                </div>

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <UserRound className="h-4 w-4" />
                </div>
            </div>

            {/* Profile Summary */}
            <div className="mb-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/60">
                {profile.avatar_url ? (
                    <img
                        src={profile.avatar_url}
                        alt={profile.full_name || "Profile"}
                        className="h-12 w-12 shrink-0 rounded-xl object-cover"
                    />
                ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-sm font-bold text-white">
                        {initials}
                    </div>
                )}

                <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                        {profile.full_name || "Your Name"}
                    </h3>

                    <p className="mt-0.5 text-xs capitalize text-slate-500 dark:text-slate-400">
                        {profile.role.replace("_", " ")}
                    </p>
                </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {information.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.label}
                            className="rounded-xl border border-slate-200 p-2.5 dark:border-slate-800"
                        >
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                                    <Icon className="h-3.5 w-3.5" />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                                        {item.label}
                                    </p>

                                    <p className="mt-0.5 truncate text-xs font-medium text-slate-700 dark:text-slate-200">
                                        {item.value}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Academic Information */}
            <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                <div className="rounded-xl border border-slate-200 p-2.5 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400">
                            <BookOpen className="h-3.5 w-3.5" />
                        </div>

                        <div className="min-w-0">
                            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                                Semester
                            </p>

                            <p className="mt-0.5 truncate text-xs font-semibold text-slate-800 dark:text-white">
                                {profile.semester || "Not provided"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 p-2.5 dark:border-slate-800">
                    <div>
                        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                            Status
                        </p>

                        <p className="mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            Active
                        </p>
                    </div>
                </div>
            </div>

            {/* Edit Profile */}
            <div className="mt-4 flex justify-end">
                <Link
                    href="/student/profile"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                    Edit Profile
                    <ArrowRight className="h-3.5 w-3.5" />
                </Link>
            </div>
        </div>
    );
}