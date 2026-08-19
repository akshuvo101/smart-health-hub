"use client";

import {
  AlertCircle,
  ArrowLeft,
  Brain,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  HeartPulse,
  LucideIcon,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import type { Profile } from "@/types/profile";
import type {
  Assessment,
  AssessmentLevel,
} from "@/types/assessment";
import type { Appointment } from "@/types/appointment";

/* =========================================================
   API Types
========================================================= */

interface CounselorStudentSummary {
  totalAssessments: number;
  totalAppointments: number;

  latestScore: number | null;
  latestMentalState: string | null;

  latestStress: AssessmentLevel | null;
  latestAnxiety: AssessmentLevel | null;
  latestDepression: AssessmentLevel | null;
  latestBurnout: AssessmentLevel | null;
  latestSleep: AssessmentLevel | null;
  latestFocus: AssessmentLevel | null;
  latestSocial: AssessmentLevel | null;
  latestMood: AssessmentLevel | null;
}

interface CounselorStudentApiResponse {
  success: boolean;

  data: {
    student: Profile;
    assessments: Assessment[];
    appointments: Appointment[];
    summary: CounselorStudentSummary;
  } | null;

  message?: string;
}

/* =========================================================
   Helper Functions
========================================================= */

function getInitials(name: string | null) {
  if (!name) return "S";

  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (
    parts[0].charAt(0) +
    parts[parts.length - 1].charAt(0)
  ).toUpperCase();
}

/* ---------------------------------------------------------
   Date
--------------------------------------------------------- */

function formatDate(date: string | null) {
  if (!date) return "Not provided";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Not provided";
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ---------------------------------------------------------
   Time
--------------------------------------------------------- */

function formatTime(time: string | null) {
  if (!time) return "Not provided";

  const parts = time.split(":");

  if (parts.length < 2) {
    return time;
  }

  const hours = Number(parts[0]);
  const minutes = Number(parts[1]);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes)
  ) {
    return time;
  }

  const date = new Date();

  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

/* ---------------------------------------------------------
   Label
--------------------------------------------------------- */

function formatLabel(value: string | null) {
  if (!value) return "Not available";

  return value
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

/* ---------------------------------------------------------
   Status
--------------------------------------------------------- */

function getStatusClass(status: string | null) {
  const value = status?.toLowerCase();

  if (
    value === "confirmed" ||
    value === "completed" ||
    value === "approved"
  ) {
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  }

  if (
    value === "pending" ||
    value === "requested"
  ) {
    return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
  }

  if (
    value === "cancelled" ||
    value === "rejected"
  ) {
    return "bg-red-500/10 text-red-600 dark:text-red-400";
  }

  return "bg-slate-500/10 text-slate-600 dark:text-slate-400";
}

/* ---------------------------------------------------------
   Wellness Color
--------------------------------------------------------- */

function getWellnessClass(value: string | null) {
  const normalized = value?.toLowerCase() ?? "";

  if (
    normalized.includes("high") ||
    normalized.includes("severe") ||
    normalized.includes("poor") ||
    normalized.includes("bad")
  ) {
    return "text-red-500";
  }

  if (
    normalized.includes("moderate") ||
    normalized.includes("medium") ||
    normalized.includes("average")
  ) {
    return "text-amber-500";
  }

  if (
    normalized.includes("low") ||
    normalized.includes("good") ||
    normalized.includes("excellent") ||
    normalized.includes("healthy") ||
    normalized.includes("very low")
  ) {
    return "text-emerald-500";
  }

  return "text-slate-700 dark:text-slate-200";
}

/* ---------------------------------------------------------
   Score Color
--------------------------------------------------------- */

function getScoreClass(score: number | null) {
  if (score === null) {
    return "text-slate-500";
  }

  if (score >= 70) {
    return "text-emerald-500";
  }

  if (score >= 40) {
    return "text-amber-500";
  }

  return "text-red-500";
}

/* ---------------------------------------------------------
   Recommendations
--------------------------------------------------------- */

function getRecommendationText(
  recommendations: unknown
) {
  if (!recommendations) return null;

  if (typeof recommendations === "string") {
    return recommendations;
  }

  if (Array.isArray(recommendations)) {
    const text = recommendations
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        if (
          typeof item === "object" &&
          item !== null
        ) {
          const recommendation =
            item as {
              title?: string;
              description?: string;
            };

          if (
            recommendation.title ||
            recommendation.description
          ) {
            return [
              recommendation.title,
              recommendation.description,
            ]
              .filter(Boolean)
              .join(": ");
          }
        }

        return JSON.stringify(item);
      })
      .join("\n");

    return text || null;
  }

  if (typeof recommendations === "object") {
    try {
      return JSON.stringify(
        recommendations,
        null,
        2
      );
    } catch {
      return null;
    }
  }

  return null;
}

/* =========================================================
   Main Page
========================================================= */

export default function CounselorStudentProfilePage() {
  const params = useParams();
  const router = useRouter();

  const studentId =
    typeof params.id === "string"
      ? params.id
      : "";

  const [student, setStudent] =
    useState<Profile | null>(null);

  const [assessments, setAssessments] =
    useState<Assessment[]>([]);

  const [appointments, setAppointments] =
    useState<Appointment[]>([]);

  const [summary, setSummary] =
    useState<CounselorStudentSummary | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /* =======================================================
     Fetch Student
  ======================================================= */

  const fetchStudent = useCallback(async () => {
    if (!studentId) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/counselor/students/${studentId}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const result: CounselorStudentApiResponse =
        await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to load student profile."
        );
      }

      if (!result.data) {
        throw new Error(
          "Student profile data is unavailable."
        );
      }

      setStudent(result.data.student);

      setAssessments(
        result.data.assessments ?? []
      );

      setAppointments(
        result.data.appointments ?? []
      );

      setSummary(result.data.summary);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load student profile."
      );
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  /* =======================================================
     Initial Fetch
  ======================================================= */

  useEffect(() => {
    fetchStudent();
  }, [fetchStudent]);

  /* =======================================================
     Loading
  ======================================================= */

  if (loading) {
    return (
      <div className="space-y-5">
        {/* Back Button */}
        <div className="h-9 w-32 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

        {/* Header */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="h-20 animate-pulse bg-slate-200 dark:bg-slate-800" />

          <div className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />

              <div className="space-y-2">
                <div className="h-5 w-44 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-60 rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-24 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800"
            />
          ))}
        </div>

        {/* Main */}
        <div className="grid gap-5 xl:grid-cols-2">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="h-64 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800"
            />
          ))}
        </div>
      </div>
    );
  }

  /* =======================================================
     Error
  ======================================================= */

  if (error || !student) {
    return (
      <div className="space-y-5">
        <button
          type="button"
          onClick={() =>
            router.push("/counselor/students")
          }
          className="
            inline-flex
            items-center
            gap-1.5
            rounded-xl
            px-2.5
            py-2
            text-xs
            font-medium
            text-slate-600
            transition
            hover:bg-slate-100
            dark:text-slate-300
            dark:hover:bg-slate-800
          "
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Students
        </button>

        <section
          className="
            flex
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-red-200
            bg-red-50
            px-5
            py-12
            text-center
            dark:border-red-900/50
            dark:bg-red-950/20
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-red-500/10
              text-red-500
            "
          >
            <AlertCircle className="h-6 w-6" />
          </div>

          <h1 className="mt-4 text-base font-semibold">
            Failed to load student
          </h1>

          <p className="mt-1 max-w-md text-xs text-slate-500 dark:text-slate-400">
            {error ||
              "Student profile could not be found."}
          </p>

          <button
            type="button"
            onClick={fetchStudent}
            className="
              mt-4
              rounded-xl
              bg-cyan-500
              px-4
              py-2
              text-xs
              font-medium
              text-white
              transition
              hover:bg-cyan-600
            "
          >
            Try Again
          </button>
        </section>
      </div>
    );
  }

  /* =======================================================
     Latest Assessment
  ======================================================= */

  const latestAssessment =
    assessments.length > 0
      ? assessments[0]
      : null;

  const recommendationText =
    latestAssessment
      ? getRecommendationText(
          latestAssessment.recommendations
        )
      : null;

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="space-y-5">
      {/* =================================================
          Back Navigation
      ================================================= */}

      <button
        type="button"
        onClick={() =>
          router.push("/counselor/students")
        }
        className="
          inline-flex
          items-center
          gap-1.5
          rounded-xl
          px-2.5
          py-2
          text-xs
          font-medium
          text-slate-600
          transition
          hover:bg-slate-100
          dark:text-slate-300
          dark:hover:bg-slate-800
        "
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Students
      </button>

      {/* =================================================
          Student Header
      ================================================= */}

      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        {/* Cover */}
        <div className="h-20 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600" />

        {/* Profile */}
        <div className="px-5 pb-5">
          <div className="-mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-3">
              {student.avatar_url ? (
                <img
                  src={student.avatar_url}
                  alt={
                    student.full_name ??
                    "Student"
                  }
                  className="
                    h-16
                    w-16
                    shrink-0
                    rounded-2xl
                    border-4
                    border-white
                    object-cover
                    shadow-md
                    dark:border-slate-900
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-16
                    w-16
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    border-4
                    border-white
                    bg-gradient-to-br
                    from-cyan-500
                    to-blue-600
                    text-lg
                    font-bold
                    text-white
                    shadow-md
                    dark:border-slate-900
                  "
                >
                  {getInitials(
                    student.full_name
                  )}
                </div>
              )}

              <div className="pb-0.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <h1 className="text-xl font-bold tracking-tight">
                    {student.full_name ||
                      "Unnamed Student"}
                  </h1>

                  <span
                    className="
                      rounded-full
                      bg-emerald-500/10
                      px-2
                      py-0.5
                      text-[10px]
                      font-semibold
                      text-emerald-600
                      dark:text-emerald-400
                    "
                  >
                    Student
                  </span>
                </div>

                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {student.email ||
                    "Email not provided"}
                </p>
              </div>
            </div>

            <div
              className="
                flex
                items-center
                gap-1.5
                text-[11px]
                text-slate-500
                dark:text-slate-400
              "
            >
              <CalendarDays className="h-3.5 w-3.5" />

              Joined{" "}
              {formatDate(student.created_at)}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          Quick Stats
      ================================================= */}

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {/* Latest Score */}

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-4
            py-3.5
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Latest Score
              </p>

              <p
                className={`mt-0.5 text-xl font-bold ${getScoreClass(
                  summary?.latestScore ?? null
                )}`}
              >
                {summary?.latestScore ?? "—"}
              </p>
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500">
              <HeartPulse className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Assessments */}

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-4
            py-3.5
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Assessments
              </p>

              <p className="mt-0.5 text-xl font-bold">
                {summary?.totalAssessments ?? 0}
              </p>
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
              <Brain className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Appointments */}

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-4
            py-3.5
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Appointments
              </p>

              <p className="mt-0.5 text-xl font-bold">
                {summary?.totalAppointments ?? 0}
              </p>
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
              <CalendarDays className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Mental State */}

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-4
            py-3.5
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Mental State
              </p>

              <p className="mt-0.5 truncate text-base font-bold">
                {formatLabel(
                  summary?.latestMentalState ??
                    null
                )}
              </p>
            </div>

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          Personal + Wellness
      ================================================= */}

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        {/* =================================================
            Personal Information
        ================================================= */}

        <section
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500">
              <UserRound className="h-4 w-4" />
            </div>

            <div>
              <h2 className="text-sm font-semibold">
                Personal Information
              </h2>

              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Student profile details
              </p>
            </div>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            <InfoItem
              icon={Mail}
              label="Email"
              value={student.email}
            />

            <InfoItem
              icon={Phone}
              label="Phone"
              value={student.phone}
            />

            <InfoItem
              icon={GraduationCap}
              label="Student ID"
              value={student.student_id}
            />

            <InfoItem
              icon={GraduationCap}
              label="Department"
              value={student.department}
            />

            <InfoItem
              icon={Users}
              label="Semester"
              value={student.semester}
            />

            <InfoItem
              icon={CalendarDays}
              label="Date of Birth"
              value={formatDate(
                student.date_of_birth
              )}
            />

            <InfoItem
              icon={UserRound}
              label="Gender"
              value={student.gender}
            />

            <InfoItem
              icon={GraduationCap}
              label="University"
              value={student.university}
            />
          </div>

          {student.bio && (
            <div className="mt-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                About
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-700 dark:text-slate-300">
                {student.bio}
              </p>
            </div>
          )}
        </section>

        {/* =================================================
            Wellness Overview
        ================================================= */}

        <section
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <div className="mb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
                <HeartPulse className="h-4 w-4" />
              </div>

              <div>
                <h2 className="text-sm font-semibold">
                  Wellness Overview
                </h2>

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Latest assessment indicators
                </p>
              </div>
            </div>

            {latestAssessment && (
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                {formatDate(
                  latestAssessment.created_at
                )}
              </span>
            )}
          </div>

          {!latestAssessment ? (
            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                rounded-xl
                bg-slate-50
                px-4
                py-9
                text-center
                dark:bg-slate-800/60
              "
            >
              <Brain className="h-7 w-7 text-slate-400" />

              <p className="mt-2 text-xs font-medium">
                No assessment available
              </p>

              <p className="mt-1 max-w-xs text-[11px] text-slate-500 dark:text-slate-400">
                Wellness indicators will appear after
                the student completes an assessment.
              </p>
            </div>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              <WellnessItem
                label="Stress"
                value={latestAssessment.stress}
              />

              <WellnessItem
                label="Anxiety"
                value={latestAssessment.anxiety}
              />

              <WellnessItem
                label="Depression"
                value={
                  latestAssessment.depression
                }
              />

              <WellnessItem
                label="Burnout"
                value={latestAssessment.burnout}
              />

              <WellnessItem
                label="Sleep"
                value={latestAssessment.sleep}
              />

              <WellnessItem
                label="Focus"
                value={latestAssessment.focus}
              />

              <WellnessItem
                label="Social"
                value={latestAssessment.social}
              />

              <WellnessItem
                label="Mood"
                value={latestAssessment.mood}
              />

              <WellnessItem
                label="Mental State"
                value={
                  latestAssessment.mental_state
                }
              />
            </div>
          )}
        </section>
      </div>

      {/* =================================================
          AI Summary + Recommendations
      ================================================= */}

      {latestAssessment && (
        <div className="grid gap-5 xl:grid-cols-2">
          {/* AI Summary */}

          <section
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-sm
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                <Sparkles className="h-4 w-4" />
              </div>

              <div>
                <h2 className="text-sm font-semibold">
                  AI Wellness Summary
                </h2>

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Generated from latest assessment
                </p>
              </div>
            </div>

            {latestAssessment.ai_summary ? (
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                <p className="whitespace-pre-line text-xs leading-5 text-slate-700 dark:text-slate-300">
                  {latestAssessment.ai_summary}
                </p>
              </div>
            ) : (
              <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                No AI summary is available for this
                assessment.
              </div>
            )}
          </section>

          {/* Recommendations */}

          <section
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-sm
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 className="h-4 w-4" />
              </div>

              <div>
                <h2 className="text-sm font-semibold">
                  Recommendations
                </h2>

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Suggested wellness support
                </p>
              </div>
            </div>

            {recommendationText ? (
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                <p className="whitespace-pre-line text-xs leading-5 text-slate-700 dark:text-slate-300">
                  {recommendationText}
                </p>
              </div>
            ) : (
              <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                No recommendations are available for
                this assessment.
              </div>
            )}
          </section>
        </div>
      )}

      {/* =================================================
          Assessment History
      ================================================= */}

      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
              <Brain className="h-4 w-4" />
            </div>

            <div>
              <h2 className="text-sm font-semibold">
                Assessment History
              </h2>

              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Previous wellness assessments
              </p>
            </div>
          </div>
        </div>

        {assessments.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <Brain className="mx-auto h-7 w-7 text-slate-400" />

            <p className="mt-2 text-xs font-medium">
              No assessments yet
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {assessments.map((assessment) => (
              <div
                key={assessment.id}
                className="
                  px-5
                  py-3.5
                  transition-colors
                  hover:bg-slate-50
                  dark:hover:bg-slate-800/40
                "
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  {/* Assessment Info */}

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-semibold">
                        Assessment
                      </span>

                      {assessment.status && (
                        <span
                          className={`
                            rounded-full
                            px-2
                            py-0.5
                            text-[10px]
                            font-medium
                            ${getStatusClass(
                              assessment.status
                            )}
                          `}
                        >
                          {formatLabel(
                            assessment.status
                          )}
                        </span>
                      )}
                    </div>

                    <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                      {formatDate(
                        assessment.created_at
                      )}
                    </p>
                  </div>

                  {/* Metrics */}

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <MiniMetric
                      label="Score"
                      value={
                        assessment.score !== null
                          ? String(
                              assessment.score
                            )
                          : "—"
                      }
                      valueClass={getScoreClass(
                        assessment.score
                      )}
                    />

                    <MiniMetric
                      label="State"
                      value={formatLabel(
                        assessment.mental_state
                      )}
                    />

                    <MiniMetric
                      label="Stress"
                      value={formatLabel(
                        assessment.stress
                      )}
                      valueClass={getWellnessClass(
                        assessment.stress
                      )}
                    />

                    <MiniMetric
                      label="Anxiety"
                      value={formatLabel(
                        assessment.anxiety
                      )}
                      valueClass={getWellnessClass(
                        assessment.anxiety
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* =================================================
          Appointments
      ================================================= */}

      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
              <CalendarDays className="h-4 w-4" />
            </div>

            <div>
              <h2 className="text-sm font-semibold">
                Counseling Appointments
              </h2>

              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Appointment history with counselors
              </p>
            </div>
          </div>
        </div>

        {appointments.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <CalendarDays className="mx-auto h-7 w-7 text-slate-400" />

            <p className="mt-2 text-xs font-medium">
              No appointments yet
            </p>

            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Appointment records will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="
                  px-5
                  py-3.5
                  transition-colors
                  hover:bg-slate-50
                  dark:hover:bg-slate-800/40
                "
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  {/* Appointment Info */}

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <h3 className="truncate text-xs font-semibold">
                        {appointment.title ||
                          "Counseling Session"}
                      </h3>

                      {appointment.status && (
                        <span
                          className={`
                            rounded-full
                            px-2
                            py-0.5
                            text-[10px]
                            font-medium
                            ${getStatusClass(
                              appointment.status
                            )}
                          `}
                        >
                          {formatLabel(
                            appointment.status
                          )}
                        </span>
                      )}
                    </div>

                    {appointment.description && (
                      <p className="mt-0.5 line-clamp-2 text-[11px] text-slate-500 dark:text-slate-400">
                        {appointment.description}
                      </p>
                    )}
                  </div>

                  {/* Appointment Details */}

                  <div className="grid gap-1.5 text-[11px] sm:grid-cols-3 lg:min-w-[400px]">
                    <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-2 dark:bg-slate-800">
                      <CalendarDays className="h-3.5 w-3.5 shrink-0 text-slate-400" />

                      <span className="truncate">
                        {formatDate(
                          appointment.appointment_date
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-2 dark:bg-slate-800">
                      <Clock3 className="h-3.5 w-3.5 shrink-0 text-slate-400" />

                      <span className="truncate">
                        {formatTime(
                          appointment.appointment_time
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-2 dark:bg-slate-800">
                      <Users className="h-3.5 w-3.5 shrink-0 text-slate-400" />

                      <span className="truncate">
                        {formatLabel(
                          appointment.meeting_type
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* =========================================================
   Small Components
========================================================= */

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string | null;
}) {
  return (
    <div
      className="
        rounded-xl
        bg-slate-50
        px-3
        py-2.5
        dark:bg-slate-800/60
      "
    >
      <div
        className="
          flex
          items-center
          gap-1.5
          text-[10px]
          font-medium
          text-slate-500
          dark:text-slate-400
        "
      >
        <Icon className="h-3 w-3" />
        {label}
      </div>

      <p className="mt-0.5 truncate text-xs font-semibold">
        {value || "Not provided"}
      </p>
    </div>
  );
}

function WellnessItem({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div
      className="
        rounded-xl
        bg-slate-50
        px-3
        py-2.5
        dark:bg-slate-800/60
      "
    >
      <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <p
        className={`
          mt-0.5
          truncate
          text-xs
          font-semibold
          ${getWellnessClass(value)}
        `}
      >
        {formatLabel(value)}
      </p>
    </div>
  );
}

function MiniMetric({
  label,
  value,
  valueClass = "",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div
      className="
        min-w-[82px]
        rounded-lg
        bg-slate-100
        px-2.5
        py-1.5
        dark:bg-slate-800
      "
    >
      <p className="text-[9px] font-medium text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <p
        className={`
          mt-0.5
          truncate
          text-[11px]
          font-semibold
          ${valueClass}
        `}
      >
        {value}
      </p>
    </div>
  );
}