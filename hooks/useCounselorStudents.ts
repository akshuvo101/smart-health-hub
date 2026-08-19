"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { createClient } from "@/lib/supabase/client";

import { ApiResponse } from "@/types/api";

import { CounselorStudent } from "@/repositories/counselor-student.repository";

export function useCounselorStudents() {
  const [students, setStudents] = useState<
    CounselorStudent[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(
    null
  );

  const isMountedRef = useRef(true);

  const refreshTimeoutRef =
    useRef<NodeJS.Timeout | null>(null);

  /**
   * Fetch students
   */
  const fetchStudents = useCallback(async () => {
    try {
      setError(null);

      const response = await fetch(
        "/api/counselor/students",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const result: ApiResponse<
        CounselorStudent[]
      > = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ??
            "Failed to fetch students."
        );
      }

      if (isMountedRef.current) {
        setStudents(result.data ?? []);
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch students."
        );
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    const supabase = createClient();

    // Initial fetch
    fetchStudents();

    console.log(
      "🔵 Counselor students realtime: connecting..."
    );

    /**
     * Debounced refresh
     */
    const scheduleRefresh = () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }

      refreshTimeoutRef.current = setTimeout(() => {
        console.log(
          "🔄 Counselor students realtime refresh..."
        );

        fetchStudents();
      }, 300);
    };

    /**
     * Profiles realtime
     */
    const profilesChannel = supabase
      .channel("counselor-students-profiles")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profiles",
        },
        (payload) => {
          console.log(
            "🟢 STUDENT PROFILE REALTIME EVENT:",
            payload.eventType
          );

          scheduleRefresh();
        }
      )
      .subscribe((status) => {
        console.log(
          "🔵 Counselor students realtime status:",
          status
        );
      });

    /**
     * Appointments realtime
     *
     * Appointment changes affect student statistics.
     */
    const appointmentsChannel = supabase
      .channel("counselor-student-appointments")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "appointments",
        },
        (payload) => {
          console.log(
            "🟢 STUDENT APPOINTMENT EVENT:",
            payload.eventType
          );

          scheduleRefresh();
        }
      )
      .subscribe();

    return () => {
      isMountedRef.current = false;

      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }

      console.log(
        "🔴 Counselor students realtime disconnected"
      );

      supabase.removeChannel(profilesChannel);
      supabase.removeChannel(appointmentsChannel);
    };
  }, [fetchStudents]);

  return {
    students,
    loading,
    error,
    refresh: fetchStudents,
  };
}