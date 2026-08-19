"use client";

import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    Users,
    XCircle,
    ListChecks,
} from "lucide-react";

import AppointmentCard from "@/components/appointments/appointment-card";
import AppointmentCalendar from "@/components/appointments/appointment-calendar";
import AppointmentForm from "@/components/appointments/appointment-form";

import { useAppointments } from "@/hooks/useAppointments";

export default function AppointmentsClient() {
    const {
        appointments,
        loading,
        error,
        refresh,
    } = useAppointments();

    const today = new Date();

    const stats = {
        total: appointments.length,

        pending: appointments.filter(
            (appointment) =>
                appointment.status === "pending"
        ).length,

        approved: appointments.filter(
            (appointment) =>
                appointment.status === "approved"
        ).length,

        completed: appointments.filter(
            (appointment) =>
                appointment.status === "completed"
        ).length,

        cancelled: appointments.filter(
            (appointment) =>
                appointment.status === "cancelled"
        ).length,

        upcoming: appointments.filter(
            (appointment) => {
                if (
                    appointment.status !==
                    "approved"
                ) {
                    return false;
                }

                const appointmentDate =
                    new Date(
                        `${appointment.appointment_date}T${appointment.appointment_time}`
                    );

                return (
                    !Number.isNaN(
                        appointmentDate.getTime()
                    ) &&
                    appointmentDate >= today
                );
            }
        ).length,
    };

    const assignedCounselor =
        appointments.some(
            (appointment) =>
                appointment.counselor_id
        );

    return (
        <div className="space-y-5">
            {/* ================================
                PAGE HEADER
            ================================= */}

            <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                            <CalendarDays className="h-5 w-5" />
                        </div>

                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Appointments
                            </h1>

                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Manage your counseling
                                sessions
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <Users className="h-4 w-4 text-emerald-500" />

                    <span className="text-slate-500 dark:text-slate-400">
                        Counselor
                    </span>

                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {assignedCounselor
                            ? "Assigned"
                            : "Not Assigned"}
                    </span>
                </div>
            </section>

            {/* ================================
                STATUS SUMMARY
            ================================= */}

            <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {/* All */}

                <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            <ListChecks className="h-4 w-4" />
                        </div>

                        <span className="text-2xl font-bold text-slate-900 dark:text-white">
                            {stats.total}
                        </span>
                    </div>

                    <p className="mt-3 text-xs font-medium text-slate-500">
                        All
                    </p>
                </div>

                {/* Pending */}

                <div className="group rounded-2xl border border-amber-100 bg-amber-50/50 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-amber-500/10 dark:bg-amber-500/5">
                    <div className="flex items-center justify-between">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400">
                            <Clock3 className="h-4 w-4" />
                        </div>

                        <span className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                            {stats.pending}
                        </span>
                    </div>

                    <p className="mt-3 text-xs font-medium text-amber-700/70 dark:text-amber-300/70">
                        Pending
                    </p>
                </div>

                {/* Approved */}

                <div className="group rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-emerald-500/10 dark:bg-emerald-500/5">
                    <div className="flex items-center justify-between">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                            <CheckCircle2 className="h-4 w-4" />
                        </div>

                        <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                            {stats.approved}
                        </span>
                    </div>

                    <p className="mt-3 text-xs font-medium text-emerald-700/70 dark:text-emerald-300/70">
                        Approved
                    </p>
                </div>

                {/* Completed */}

                <div className="group rounded-2xl border border-blue-100 bg-blue-50/50 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-blue-500/10 dark:bg-blue-500/5">
                    <div className="flex items-center justify-between">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
                            <CalendarDays className="h-4 w-4" />
                        </div>

                        <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                            {stats.completed}
                        </span>
                    </div>

                    <p className="mt-3 text-xs font-medium text-blue-700/70 dark:text-blue-300/70">
                        Completed
                    </p>
                </div>

                {/* Cancelled */}

                <div className="group rounded-2xl border border-red-100 bg-red-50/50 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-red-500/10 dark:bg-red-500/5">
                    <div className="flex items-center justify-between">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400">
                            <XCircle className="h-4 w-4" />
                        </div>

                        <span className="text-2xl font-bold text-red-700 dark:text-red-300">
                            {stats.cancelled}
                        </span>
                    </div>

                    <p className="mt-3 text-xs font-medium text-red-700/70 dark:text-red-300/70">
                        Cancelled
                    </p>
                </div>
            </section>

            {/* ================================
                ERROR
            ================================= */}

            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
                    {error}
                </div>
            )}

            {/* ================================
                MAIN CONTENT
            ================================= */}

            <section className="grid items-start gap-5 xl:grid-cols-[340px_minmax(0,1fr)]">
                {/* Appointment Form */}

                <AppointmentForm
                    onSuccess={refresh}
                />

                {/* Appointment List */}

                <div className="min-w-0">
                    <AppointmentCard
                        appointments={appointments}
                        loading={loading}
                    />
                </div>
            </section>

            {/* ================================
                CALENDAR
            ================================= */}

            <section>
                <AppointmentCalendar
                    appointments={appointments}
                />
            </section>
        </div>
    );
}