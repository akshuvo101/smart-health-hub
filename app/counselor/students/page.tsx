"use client";

import {
  Users,
  Search,
  Mail,
  Phone,
  GraduationCap,
  CalendarDays,
  RefreshCw,
  UserRound,
  AlertCircle,
  Building2,
  Hash,
  ChevronRight,
  X,
} from "lucide-react";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type {
  CounselorStudent,
  CounselorStudentApiResponse,
} from "@/types/student";

export default function CounselorStudentsPage() {
  const router = useRouter();

  const [students, setStudents] = useState<CounselorStudent[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // =====================================================
  // Fetch Students
  // =====================================================

  const fetchStudents = useCallback(
    async (showRefreshing = false) => {
      try {
        if (showRefreshing) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError(null);

        const response = await fetch(
          "/api/counselor/students",
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
              "Failed to fetch students."
          );
        }

        setStudents(result.data ?? []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch students."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  // =====================================================
  // Initial Fetch
  // =====================================================

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // =====================================================
  // Search
  // =====================================================

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return students;

    return students.filter((student) => {
      const values = [
        student.full_name,
        student.email,
        student.student_id,
        student.department,
        student.semester,
        student.phone,
        student.university,
      ];

      return values.some((value) =>
        value?.toLowerCase().includes(query)
      );
    });
  }, [students, search]);

  // =====================================================
  // Helpers
  // =====================================================

  const getInitials = (name: string | null) => {
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
  };

  const formatDate = (date: string) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // Open Student Profile
  // =====================================================

  const openStudentProfile = (studentId: string) => {
    router.push(
      `/counselor/students/${studentId}`
    );
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="space-y-4">

      {/* =================================================
          HEADER
      ================================================= */}

      <section
        className="
          rounded-xl
          border
          border-slate-200
          bg-white
          p-4
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <div
          className="
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="min-w-0">

            <div
              className="
                mb-1.5
                inline-flex
                items-center
                gap-1.5
                rounded-full
                bg-cyan-500/10
                px-2.5
                py-1
                text-[11px]
                font-semibold
                text-cyan-600
                dark:text-cyan-400
              "
            >
              <Users className="h-3 w-3" />
              Student Management
            </div>

            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              Student Directory
            </h1>

            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              View student profiles and academic information.
            </p>
          </div>

          <button
            type="button"
            onClick={() => fetchStudents(true)}
            disabled={refreshing}
            className="
              inline-flex
              shrink-0
              items-center
              justify-center
              gap-1.5
              rounded-lg
              border
              border-slate-200
              bg-slate-50
              px-3
              py-2
              text-xs
              font-medium
              text-slate-700
              transition
              hover:border-cyan-500/30
              hover:bg-cyan-500/5
              hover:text-cyan-600
              disabled:cursor-not-allowed
              disabled:opacity-60
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-300
              dark:hover:text-cyan-400
            "
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${
                refreshing ? "animate-spin" : ""
              }`}
            />

            {refreshing ? "Refreshing" : "Refresh"}
          </button>
        </div>
      </section>

      {/* =================================================
          STATS + SEARCH
      ================================================= */}

      <section className="grid gap-3 lg:grid-cols-[auto_1fr]">

        {/* Stats */}

        <div className="grid grid-cols-2 gap-2.5">

          {/* Total Students */}

          <div
            className="
              min-w-[135px]
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              shadow-sm
              dark:border-slate-800
              dark:bg-slate-900
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
              <Users className="h-3.5 w-3.5 text-cyan-500" />
              Total Students
            </div>

            <p className="mt-1 text-xl font-bold">
              {loading ? "—" : students.length}
            </p>
          </div>

          {/* Results */}

          <div
            className="
              min-w-[135px]
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              shadow-sm
              dark:border-slate-800
              dark:bg-slate-900
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
              <Search className="h-3.5 w-3.5 text-violet-500" />
              Results
            </div>

            <p className="mt-1 text-xl font-bold">
              {loading
                ? "—"
                : filteredStudents.length}
            </p>
          </div>
        </div>

        {/* Search */}

        <div
          className="
            flex
            items-center
            rounded-xl
            border
            border-slate-200
            bg-white
            px-3
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <Search className="h-4 w-4 shrink-0 text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search name, email, student ID, department..."
            className="
              w-full
              bg-transparent
              px-2.5
              py-3
              text-xs
              outline-none
              placeholder:text-slate-400
            "
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="
                rounded-md
                p-1
                text-slate-400
                transition
                hover:bg-slate-100
                hover:text-slate-600
                dark:hover:bg-slate-800
              "
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </section>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <section
          className="
            flex
            items-center
            gap-2.5
            rounded-xl
            border
            border-red-200
            bg-red-50
            px-3.5
            py-2.5
            text-red-600
            dark:border-red-900/50
            dark:bg-red-950/30
            dark:text-red-400
          "
        >
          <AlertCircle className="h-4 w-4 shrink-0" />

          <div className="min-w-0">
            <p className="text-xs font-semibold">
              Failed to load students
            </p>

            <p className="mt-0.5 truncate text-[11px]">
              {error}
            </p>
          </div>

          <button
            type="button"
            onClick={() => fetchStudents(true)}
            className="
              ml-auto
              shrink-0
              rounded-md
              bg-red-500
              px-2.5
              py-1.5
              text-[11px]
              font-medium
              text-white
              hover:bg-red-600
            "
          >
            Retry
          </button>
        </section>
      )}

      {/* =================================================
          DIRECTORY
      ================================================= */}

      <section
        className="
          overflow-hidden
          rounded-xl
          border
          border-slate-200
          bg-white
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
        "
      >

        {/* Directory Header */}

        <div
          className="
            flex
            flex-col
            gap-1.5
            border-b
            border-slate-200
            px-4
            py-3
            sm:flex-row
            sm:items-center
            sm:justify-between
            dark:border-slate-800
          "
        >
          <div>

            <div className="flex items-center gap-2">

              <h2 className="text-sm font-semibold">
                Student Directory
              </h2>

              {!loading && (
                <span
                  className="
                    rounded-full
                    bg-cyan-500/10
                    px-1.5
                    py-0.5
                    text-[10px]
                    font-semibold
                    text-cyan-600
                    dark:text-cyan-400
                  "
                >
                  {filteredStudents.length}
                </span>
              )}
            </div>

            <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
              {loading
                ? "Loading students..."
                : search
                  ? `Showing results for "${search}"`
                  : "Registered student profiles"}
            </p>
          </div>

          <GraduationCap className="hidden h-4 w-4 text-cyan-500 sm:block" />
        </div>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse px-4 py-3"
              >
                <div className="flex items-center gap-3">

                  <div
                    className="
                      h-9
                      w-9
                      rounded-lg
                      bg-slate-200
                      dark:bg-slate-800
                    "
                  />

                  <div className="flex-1 space-y-1.5">

                    <div
                      className="
                        h-3
                        w-32
                        rounded
                        bg-slate-200
                        dark:bg-slate-800
                      "
                    />

                    <div
                      className="
                        h-2.5
                        w-48
                        rounded
                        bg-slate-200
                        dark:bg-slate-800
                      "
                    />
                  </div>

                  <div
                    className="
                      hidden
                      h-7
                      w-20
                      rounded-lg
                      bg-slate-200
                      dark:bg-slate-800
                      sm:block
                    "
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =================================================
            EMPTY
        ================================================= */}

        {!loading &&
          !error &&
          filteredStudents.length === 0 && (
            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                px-5
                py-12
                text-center
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-slate-100
                  text-slate-400
                  dark:bg-slate-800
                "
              >
                {search ? (
                  <Search className="h-5 w-5" />
                ) : (
                  <Users className="h-5 w-5" />
                )}
              </div>

              <h3 className="mt-3 text-sm font-semibold">
                {search
                  ? "No students found"
                  : "No students registered"}
              </h3>

              <p className="mt-1 max-w-sm text-[11px] text-slate-500 dark:text-slate-400">
                {search
                  ? `No student matches "${search}".`
                  : "There are currently no student profiles available."}
              </p>

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="
                    mt-3
                    rounded-lg
                    bg-cyan-500
                    px-3
                    py-1.5
                    text-[11px]
                    font-medium
                    text-white
                    hover:bg-cyan-600
                  "
                >
                  Clear Search
                </button>
              )}
            </div>
          )}

        {/* =================================================
            STUDENT LIST
        ================================================= */}

        {!loading &&
          filteredStudents.length > 0 && (
            <div className="divide-y divide-slate-200 dark:divide-slate-800">

              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="
                    px-4
                    py-3
                    transition
                    hover:bg-slate-50
                    dark:hover:bg-slate-800/40
                  "
                >

                  <div
                    className="
                      flex
                      flex-col
                      gap-3
                      lg:flex-row
                      lg:items-center
                    "
                  >

                    {/* =====================================
                        Identity
                    ===================================== */}

                    <div
                      className="
                        flex
                        min-w-0
                        flex-1
                        items-center
                        gap-2.5
                      "
                    >

                      {student.avatar_url ? (
                        <img
                          src={student.avatar_url}
                          alt={
                            student.full_name ??
                            "Student"
                          }
                          className="
                            h-9
                            w-9
                            shrink-0
                            rounded-lg
                            object-cover
                          "
                        />
                      ) : (
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            bg-gradient-to-br
                            from-cyan-500
                            to-blue-500
                            text-xs
                            font-bold
                            text-white
                          "
                        >
                          {getInitials(
                            student.full_name
                          )}
                        </div>
                      )}

                      <div className="min-w-0">

                        <h3
                          className="
                            truncate
                            text-xs
                            font-semibold
                          "
                        >
                          {student.full_name ||
                            "Unnamed Student"}
                        </h3>

                        <div
                          className="
                            mt-0.5
                            flex
                            flex-wrap
                            items-center
                            gap-x-2.5
                            gap-y-0.5
                            text-[10px]
                            text-slate-500
                            dark:text-slate-400
                          "
                        >

                          {student.email && (
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />

                              <span className="max-w-[200px] truncate">
                                {student.email}
                              </span>
                            </span>
                          )}

                          {student.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {student.phone}
                            </span>
                          )}

                        </div>
                      </div>
                    </div>

                    {/* =====================================
                        Information
                    ===================================== */}

                    <div
                      className="
                        grid
                        grid-cols-2
                        gap-1.5
                        sm:grid-cols-4
                        lg:w-[500px]
                        lg:shrink-0
                      "
                    >

                      {/* Student ID */}

                      <div
                        className="
                          rounded-lg
                          bg-slate-50
                          px-2.5
                          py-1.5
                          dark:bg-slate-800/70
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-1
                            text-[9px]
                            font-medium
                            uppercase
                            tracking-wide
                            text-slate-400
                          "
                        >
                          <Hash className="h-2.5 w-2.5" />
                          ID
                        </div>

                        <p
                          className="
                            mt-0.5
                            truncate
                            text-[10px]
                            font-semibold
                            text-slate-700
                            dark:text-slate-200
                          "
                        >
                          {student.student_id ||
                            "Not provided"}
                        </p>
                      </div>

                      {/* Department */}

                      <div
                        className="
                          rounded-lg
                          bg-slate-50
                          px-2.5
                          py-1.5
                          dark:bg-slate-800/70
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-1
                            text-[9px]
                            font-medium
                            uppercase
                            tracking-wide
                            text-slate-400
                          "
                        >
                          <Building2 className="h-2.5 w-2.5" />
                          Dept.
                        </div>

                        <p
                          className="
                            mt-0.5
                            truncate
                            text-[10px]
                            font-semibold
                            text-slate-700
                            dark:text-slate-200
                          "
                        >
                          {student.department ||
                            "Not provided"}
                        </p>
                      </div>

                      {/* Semester */}

                      <div
                        className="
                          rounded-lg
                          bg-slate-50
                          px-2.5
                          py-1.5
                          dark:bg-slate-800/70
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-1
                            text-[9px]
                            font-medium
                            uppercase
                            tracking-wide
                            text-slate-400
                          "
                        >
                          <GraduationCap className="h-2.5 w-2.5" />
                          Semester
                        </div>

                        <p
                          className="
                            mt-0.5
                            truncate
                            text-[10px]
                            font-semibold
                            text-slate-700
                            dark:text-slate-200
                          "
                        >
                          {student.semester ||
                            "Not provided"}
                        </p>
                      </div>

                      {/* Joined */}

                      <div
                        className="
                          rounded-lg
                          bg-slate-50
                          px-2.5
                          py-1.5
                          dark:bg-slate-800/70
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-1
                            text-[9px]
                            font-medium
                            uppercase
                            tracking-wide
                            text-slate-400
                          "
                        >
                          <CalendarDays className="h-2.5 w-2.5" />
                          Joined
                        </div>

                        <p
                          className="
                            mt-0.5
                            truncate
                            text-[10px]
                            font-semibold
                            text-slate-700
                            dark:text-slate-200
                          "
                        >
                          {formatDate(
                            student.created_at
                          )}
                        </p>
                      </div>

                    </div>

                    {/* =====================================
                        View Profile
                    ===================================== */}

                    <button
                      type="button"
                      onClick={() =>
                        openStudentProfile(
                          student.id
                        )
                      }
                      className="
                        group
                        inline-flex
                        shrink-0
                        items-center
                        justify-center
                        gap-1
                        rounded-lg
                        border
                        border-cyan-500/20
                        bg-cyan-500/10
                        px-3
                        py-2
                        text-[10px]
                        font-semibold
                        text-cyan-600
                        transition
                        hover:border-cyan-500
                        hover:bg-cyan-500
                        hover:text-white
                        dark:text-cyan-400
                        dark:hover:text-white
                      "
                    >
                      <UserRound className="h-3 w-3" />

                      View Profile

                      <ChevronRight
                        className="
                          h-3 w-3
                          transition-transform
                          group-hover:translate-x-0.5
                        "
                      />
                    </button>
                  </div>

                  {/* =====================================
                      University
                  ===================================== */}

                  {student.university && (
                    <div
                      className="
                        mt-2
                        ml-11
                        flex
                        items-center
                        gap-1
                        text-[10px]
                        text-slate-400
                      "
                    >
                      <Building2 className="h-2.5 w-2.5" />

                      <span className="truncate">
                        {student.university}
                      </span>
                    </div>
                  )}

                </div>
              ))}

            </div>
          )}

      </section>
    </div>
  );
}