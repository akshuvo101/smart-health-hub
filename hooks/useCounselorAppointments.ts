"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { createClient } from "@/lib/supabase/client";

import { Appointment } from "@/types/appointment";
import { ApiResponse } from "@/types/api";

export function useCounselorAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const isMountedRef = useRef(true);
    const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    /**
     * Fetch counselor appointments
     */
    const fetchAppointments = useCallback(async () => {
        try {
            setError(null);

            const response = await fetch(
                "/api/counselor/appointments",
                {
                    method: "GET",
                    cache: "no-store",
                }
            );

            const result: ApiResponse<Appointment[]> =
                await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message ??
                        "Failed to fetch appointments."
                );
            }

            if (isMountedRef.current) {
                setAppointments(result.data ?? []);
            }
        } catch (err) {
            if (isMountedRef.current) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to fetch appointments."
                );
            }
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
            }
        }
    }, []);

    /**
     * Accept appointment
     */
    const acceptAppointment = useCallback(
        async (id: string) => {
            try {
                setError(null);

                const response = await fetch(
                    `/api/counselor/appointments/${id}/accept`,
                    {
                        method: "PATCH",
                    }
                );

                const result: ApiResponse<Appointment> =
                    await response.json();

                if (
                    !response.ok ||
                    !result.success ||
                    !result.data
                ) {
                    throw new Error(
                        result.message ??
                            "Failed to accept appointment."
                    );
                }

                // Immediately update local state
                setAppointments((current) =>
                    current.map((appointment) =>
                        appointment.id === id
                            ? result.data!
                            : appointment
                    )
                );

                // Sync with server
                await fetchAppointments();

                return result.data;
            } catch (err) {
                const message =
                    err instanceof Error
                        ? err.message
                        : "Failed to accept appointment.";

                setError(message);

                throw new Error(message);
            }
        },
        [fetchAppointments]
    );

    /**
     * Cancel appointment
     */
    const cancelAppointment = useCallback(
        async (id: string) => {
            try {
                setError(null);

                const response = await fetch(
                    `/api/counselor/appointments/${id}/cancel`,
                    {
                        method: "PATCH",
                    }
                );

                const result: ApiResponse<Appointment> =
                    await response.json();

                if (
                    !response.ok ||
                    !result.success ||
                    !result.data
                ) {
                    throw new Error(
                        result.message ??
                            "Failed to cancel appointment."
                    );
                }

                // Immediately update local state
                setAppointments((current) =>
                    current.map((appointment) =>
                        appointment.id === id
                            ? result.data!
                            : appointment
                    )
                );

                // Sync with server
                await fetchAppointments();

                return result.data;
            } catch (err) {
                const message =
                    err instanceof Error
                        ? err.message
                        : "Failed to cancel appointment.";

                setError(message);

                throw new Error(message);
            }
        },
        [fetchAppointments]
    );

    /**
     * Initial fetch + Supabase Realtime
     */
    useEffect(() => {
        isMountedRef.current = true;

        const supabase = createClient();

        console.log(
            "🔵 Counselor appointment realtime: connecting..."
        );

        // Initial data fetch
        fetchAppointments();

        /**
         * Debounced refresh
         *
         * Prevents multiple realtime events from
         * triggering multiple API requests.
         */
        const scheduleRefresh = () => {
            if (refreshTimeoutRef.current) {
                clearTimeout(refreshTimeoutRef.current);
            }

            refreshTimeoutRef.current = setTimeout(() => {
                console.log(
                    "🔄 Counselor appointment realtime refresh..."
                );

                fetchAppointments();
            }, 300);
        };

        const channel = supabase
            .channel("counselor-appointments-realtime")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "appointments",
                },
                (payload) => {
                    console.log(
                        "🟢 APPOINTMENT REALTIME EVENT:",
                        payload.eventType,
                        payload
                    );

                    scheduleRefresh();
                }
            )
            .subscribe((status) => {
                console.log(
                    "🔵 Counselor realtime status:",
                    status
                );

                if (status === "SUBSCRIBED") {
                    console.log(
                        "🟢 Counselor appointment realtime: SUBSCRIBED"
                    );
                }

                if (status === "CHANNEL_ERROR") {
                    console.error(
                        "🔴 Counselor appointment realtime: CHANNEL_ERROR"
                    );
                }

                if (status === "TIMED_OUT") {
                    console.error(
                        "🔴 Counselor appointment realtime: TIMED_OUT"
                    );
                }

                if (status === "CLOSED") {
                    console.log(
                        "🟡 Counselor appointment realtime: CLOSED"
                    );
                }
            });

        return () => {
            isMountedRef.current = false;

            if (refreshTimeoutRef.current) {
                clearTimeout(refreshTimeoutRef.current);
            }

            console.log(
                "🔴 Counselor appointment realtime disconnected"
            );

            supabase.removeChannel(channel);
        };
    }, [fetchAppointments]);

    return {
        appointments,
        loading,
        error,
        refresh: fetchAppointments,
        acceptAppointment,
        cancelAppointment,
    };
}