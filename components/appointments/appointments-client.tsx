"use client";

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
            (appointment) => appointment.status === "pending"
        ).length,

        approved: appointments.filter(
            (appointment) => appointment.status === "approved"
        ).length,

        completed: appointments.filter(
            (appointment) => appointment.status === "completed"
        ).length,

        cancelled: appointments.filter(
            (appointment) => appointment.status === "cancelled"
        ).length,

        upcoming: appointments.filter((appointment) => {
            if (appointment.status !== "approved") {
                return false;
            }

            const appointmentDate = new Date(
                appointment.appointment_date
            );

            return appointmentDate >= today;
        }).length,
    };

    const assignedCounselor = appointments.some(
        (appointment) => appointment.counselor_id
    )
        ? "Assigned"
        : "Not Assigned";

    return (
        <div className="space-y-8">
            {/* Hero */}

            <section className="rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white shadow-xl">
                <h1 className="text-3xl font-bold">
                    Counseling Appointments
                </h1>

                <p className="mt-3 max-w-2xl text-white/90">
                    Book wellness sessions, track upcoming
                    appointments, and connect with professional
                    counselors.
                </p>
            </section>

            {/* Stats */}

            <section className="grid gap-6 md:grid-cols-3">
                <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
                    <p className="text-sm text-slate-500">
                        Upcoming Sessions
                    </p>

                    <h2 className="mt-2 text-4xl font-bold">
                        {stats.upcoming}
                    </h2>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
                    <p className="text-sm text-slate-500">
                        Completed Sessions
                    </p>

                    <h2 className="mt-2 text-4xl font-bold">
                        {stats.completed}
                    </h2>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
                    <p className="text-sm text-slate-500">
                        Assigned Counselor
                    </p>

                    <h2 className="mt-2 text-lg font-semibold">
                        {assignedCounselor}
                    </h2>
                </div>
            </section>

            {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
                    {error}
                </div>
            )}

            {/* Main */}

            <section className="grid gap-6 xl:grid-cols-3">
                <AppointmentForm
                    onSuccess={refresh}
                />

                <div className="space-y-6 xl:col-span-2">
                    <AppointmentCard
                        appointments={appointments}
                        loading={loading}
                    />

                    <AppointmentCalendar
                        appointments={appointments}
                    />
                </div>
            </section>
        </div>
    );
}