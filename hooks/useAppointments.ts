"use client";

import { useCallback, useEffect, useState } from "react";

import {
    Appointment,
    CreateAppointmentInput,
    UpdateAppointmentInput,
} from "@/types/appointment";
import { ApiResponse } from "@/types/api";


export function useAppointments() {
    const [appointments, setAppointments] = useState<
        Appointment[]
    >([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] = useState<
        string | null
    >(null);

    /**
     * Fetch appointments
     */
    const fetchAppointments =
        useCallback(async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    "/api/appointments",
                    {
                        cache: "no-store",
                    }
                );

                const result: ApiResponse<
                    Appointment[]
                > = await response.json();

                if (!result.success) {
                    throw new Error(
                        result.message ?? "Failed to fetch appointments."
                    );
                }

                setAppointments(result.data ?? []);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to fetch appointments."
                );
            } finally {
                setLoading(false);
            }
        }, []);

    /**
     * Create Appointment
     */
    const createAppointment =
        async (
            data: CreateAppointmentInput
        ) => {
            const response = await fetch(
                "/api/appointments",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const result: ApiResponse<
                Appointment
            > = await response.json();

            if (!result.success || !result.data) {
                throw new Error(
                    result.message ?? "Failed to create appointment."
                );
            }

            await fetchAppointments();

            return result.data;
        };

    /**
     * Update Appointment
     */
    const updateAppointment =
        async (
            id: string,
            data: UpdateAppointmentInput
        ) => {
            const response = await fetch(
                `/api/appointments/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const result: ApiResponse<
                Appointment
            > = await response.json();

            if (!result.success || !result.data) {
                throw new Error(
                    result.message ?? "Failed to update appointment."
                );
            }

            await fetchAppointments();

            return result.data;
        };

    /**
     * Delete Appointment
     */
    const deleteAppointment =
        async (id: string) => {
            const response = await fetch(
                `/api/appointments/${id}`,
                {
                    method: "DELETE",
                }
            );

            const result: ApiResponse<null> =
                await response.json();

            if (!result.success) {
                throw new Error(result.message);
            }

            await fetchAppointments();
        };

    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    return {
        appointments,

        loading,

        error,

        refresh: fetchAppointments,

        createAppointment,

        updateAppointment,

        deleteAppointment,
    };
}