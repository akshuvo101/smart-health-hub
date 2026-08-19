"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
    Brain,
    Sparkles,
    Heart,
    Moon,
    Flame,
    Smile,
    ArrowRight,
    ClipboardCheck,
    CalendarDays,
    FileText,
} from "lucide-react";

import MentalCheckCard from "@/components/dashboard/mental-check-card";

import { Assessment } from "@/types/assessment";
import { ApiResponse } from "@/types/api";

export default function StudentDashboardPage() {
    const [assessment, setAssessment] =
        useState<Assessment | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        fetchLatestAssessment();
    }, []);

    async function fetchLatestAssessment() {
        try {
            const response = await fetch(
                "/api/assessment/latest"
            );

            const result: ApiResponse<Assessment> =
                await response.json();

            if (
                result.success &&
                result.data
            ) {
                setAssessment(result.data);
            }
        } catch (error) {
            console.error(
                "Failed to fetch latest assessment:",
                error
            );
        } finally {
            setLoading(false);
        }
    }

    /*
     * Format assessment date
     */
    function formatDate(date: string) {
        return new Date(date).toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
            }
        );
    }

    /*
     * Today's / Latest Status
     *
     * These values now come directly
     * from the latest assessment.
     */
    const todayStatus = assessment
        ? [
              {
                  title: "Mood",
                  value: assessment.mood,
                  subtitle: "Latest assessment",
                  icon: Smile,
                  iconBg: "bg-emerald-500/10",
                  iconColor: "text-emerald-500",
              },
              {
                  title: "Sleep",
                  value: assessment.sleep,
                  subtitle: "Latest assessment",
                  icon: Moon,
                  iconBg: "bg-cyan-500/10",
                  iconColor: "text-cyan-500",
              },
              {
                  title: "Stress",
                  value: assessment.stress,
                  subtitle: "Latest assessment",
                  icon: Flame,
                  iconBg: "bg-orange-500/10",
                  iconColor: "text-orange-500",
              },
              {
                  title: "Mental Wellness",
                  value: assessment.mental_state,
                  subtitle: `Score ${assessment.score}`,
                  icon: Heart,
                  iconBg: "bg-pink-500/10",
                  iconColor: "text-pink-500",
              },
          ]
        : [];

    return (
        <div className="space-y-6">
            {/* =====================================================
                Mental Check
                IMPORTANT: Keep this component unchanged.
            ====================================================== */}

            <section>
                <MentalCheckCard />
            </section>

            {/* =====================================================
                Today's / Latest Status
            ====================================================== */}

            <section>
                <div className="mb-3">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Your Wellness
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        A quick view of your latest assessment.
                    </p>
                </div>

                {loading ? (
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {Array.from({ length: 4 }).map(
                            (_, index) => (
                                <div
                                    key={index}
                                    className="h-[125px] animate-pulse rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900"
                                />
                            )
                        )}
                    </div>
                ) : assessment ? (
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {todayStatus.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}
                                        >
                                            <Icon
                                                className={`h-4.5 w-4.5 ${item.iconColor}`}
                                            />
                                        </div>

                                        <span className="text-[10px] text-slate-400">
                                            Latest
                                        </span>
                                    </div>

                                    <div className="mt-3">
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            {item.title}
                                        </p>

                                        <h3 className="mt-1 truncate text-base font-bold text-slate-900 dark:text-white">
                                            {item.value}
                                        </h3>

                                        <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-center dark:border-slate-700 dark:bg-slate-900">
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                            <ClipboardCheck className="h-5 w-5" />
                        </div>

                        <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
                            No assessment yet
                        </h3>

                        <p className="mx-auto mt-1 max-w-md text-xs text-slate-500 dark:text-slate-400">
                            Complete your first mental wellness
                            assessment to see your personalized
                            wellness snapshot.
                        </p>

                        <Link
                            href="/student/assessment/questions"
                            className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-xs font-semibold text-white transition hover:shadow-md"
                        >
                            Take Assessment
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                )}
            </section>

            {/* =====================================================
                AI Wellness Insight
            ====================================================== */}

            {assessment && (
                <section>
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        {/* Header */}
                        <div className="border-b border-slate-200 bg-gradient-to-r from-emerald-500/[0.04] via-teal-500/[0.04] to-cyan-500/[0.04] px-4 py-3 dark:border-slate-800">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10">
                                        <Brain className="h-4.5 w-4.5 text-cyan-500" />
                                    </div>

                                    <div>
                                        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                                            AI Wellness Insight
                                        </h2>

                                        <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                                            Based on your latest assessment
                                        </p>
                                    </div>
                                </div>

                                <Sparkles className="h-4 w-4 text-emerald-500" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <div className="rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/60">
                                <p className="text-xs leading-5 text-slate-600 dark:text-slate-300">
                                    {assessment.ai_summary ||
                                        "Your AI wellness analysis is being prepared. Complete an assessment to receive personalized guidance."}
                                </p>
                            </div>

                            {/* Bottom Info */}
                            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-[10px] text-slate-400">
                                        Latest assessment
                                    </p>

                                    <p className="mt-0.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                                        {formatDate(
                                            assessment.created_at
                                        )}
                                    </p>
                                </div>

                                <Link
                                    href="/student/reports"
                                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-xs font-semibold text-white transition hover:shadow-md"
                                >
                                    <FileText className="h-3.5 w-3.5" />
                                    View Full Report
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* =====================================================
                Quick Actions
            ====================================================== */}

            <section>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="mb-3">
                        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                            Quick Actions
                        </h2>

                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                            Quickly access your wellness tools.
                        </p>
                    </div>

                    <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
                        {/* Assessment */}
                        <Link
                            href="/student/assessment/questions"
                            className="group flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-emerald-500/20 dark:bg-emerald-500/[0.04]"
                        >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                                <ClipboardCheck className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                    Take Assessment
                                </p>

                                <p className="mt-0.5 text-[10px] text-slate-500">
                                    Check your wellbeing
                                </p>
                            </div>
                        </Link>

                        {/* Assessment History */}
                        <Link
                            href="/student/reports"
                            className="group flex items-center gap-2.5 rounded-xl border border-cyan-200 bg-cyan-50/50 p-3 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-cyan-500/20 dark:bg-cyan-500/[0.04]"
                        >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500">
                                <FileText className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                    View Reports
                                </p>

                                <p className="mt-0.5 text-[10px] text-slate-500">
                                    See assessment history
                                </p>
                            </div>
                        </Link>

                        {/* Appointments */}
                        <Link
                            href="/student/appointments"
                            className="group flex items-center gap-2.5 rounded-xl border border-purple-200 bg-purple-50/50 p-3 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-purple-500/20 dark:bg-purple-500/[0.04]"
                        >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                                <CalendarDays className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                    Book Session
                                </p>

                                <p className="mt-0.5 text-[10px] text-slate-500">
                                    Connect with a counselor
                                </p>
                            </div>
                        </Link>

                        {/* AI Counselor */}
                        <Link
                            href="/student/chat"
                            className="group flex items-center gap-2.5 rounded-xl border border-pink-200 bg-pink-50/50 p-3 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-pink-500/20 dark:bg-pink-500/[0.04]"
                        >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-pink-500/10 text-pink-500">
                                <Heart className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                    AI Counselor
                                </p>

                                <p className="mt-0.5 text-[10px] text-slate-500">
                                    Get personalized guidance
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}