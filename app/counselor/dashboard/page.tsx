"use client";

import Link from "next/link";

import {
    AlertCircle,
    ArrowRight,
    Brain,
    Calendar,
    CheckCircle2,
    Clock3,
    FileText,
    Sparkles,
    Users,
    Video,
    MapPin,
    Phone,
    RefreshCw,
} from "lucide-react";

import { useCounselorAppointments } from "@/hooks/useCounselorAppointments";

export default function CounselorDashboardPage() {
    const {
        appointments,
        loading,
        error,
        refresh,
    } = useCounselorAppointments();

    /*
     * New appointment requests
     *
     * These are appointments that:
     * - are still pending
     * - have not been assigned to a counselor
     */
    const newAppointments = appointments
        .filter(
            (appointment) =>
                appointment.status === "pending" &&
                !appointment.counselor_id
        )
        .sort((a, b) => {
            const dateA = new Date(
                `${a.appointment_date}T${a.appointment_time}`
            ).getTime();

            const dateB = new Date(
                `${b.appointment_date}T${b.appointment_time}`
            ).getTime();

            return dateA - dateB;
        });

    /*
     * Approved upcoming appointments
     */
    const upcomingAppointments = appointments
        .filter(
            (appointment) =>
                appointment.status === "approved" &&
                appointment.counselor_id
        )
        .sort((a, b) => {
            const dateA = new Date(
                `${a.appointment_date}T${a.appointment_time}`
            ).getTime();

            const dateB = new Date(
                `${b.appointment_date}T${b.appointment_time}`
            ).getTime();

            return dateA - dateB;
        });

    /*
     * Today's date
     */
    const today = new Date();

    const todayString = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0"),
    ].join("-");

    /*
     * Today's approved sessions
     */
    const todaySessions = upcomingAppointments.filter(
        (appointment) =>
            appointment.appointment_date === todayString
    );

    /*
     * Stats
     */
    const pendingCount = newAppointments.length;

    const approvedCount = appointments.filter(
        (appointment) =>
            appointment.status === "approved" &&
            appointment.counselor_id
    ).length;

    /*
     * Format date
     */
    const formatDate = (date: string) => {
        const parsed = new Date(`${date}T00:00:00`);

        if (Number.isNaN(parsed.getTime())) {
            return date;
        }

        return parsed.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    /*
     * Format time
     */
    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(":");

        const date = new Date();
        date.setHours(
            Number(hours),
            Number(minutes),
            0,
            0
        );

        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        });
    };

    /*
     * Meeting type icon
     */
    const MeetingIcon = ({
        type,
    }: {
        type: string;
    }) => {
        if (type === "online") {
            return (
                <Video className="h-4 w-4" />
            );
        }

        if (type === "phone") {
            return (
                <Phone className="h-4 w-4" />
            );
        }

        return (
            <MapPin className="h-4 w-4" />
        );
    };

    /*
     * Meeting type label
     */
    const getMeetingTypeLabel = (
        type: string
    ) => {
        if (type === "online") {
            return "Online";
        }

        if (type === "phone") {
            return "Phone";
        }

        return "In Person";
    };

    return (
        <div className="space-y-8">
            {/* =========================
                HEADER
            ========================== */}

            <section>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Counselor Dashboard
                            </h1>

                            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
                                Counselor
                            </span>
                        </div>

                        <p className="mt-2 text-slate-500 dark:text-slate-400">
                            Manage student requests and upcoming
                            counseling sessions.
                        </p>
                    </div>

                    <button
                        onClick={() => refresh()}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                        <RefreshCw
                            className={`h-4 w-4 ${
                                loading
                                    ? "animate-spin"
                                    : ""
                            }`}
                        />

                        Refresh
                    </button>
                </div>
            </section>

            {/* =========================
                ERROR
            ========================== */}

            {error && (
                <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

                    <div>
                        <p className="font-semibold">
                            Unable to load appointments
                        </p>

                        <p className="mt-1 text-sm">
                            {error}
                        </p>
                    </div>
                </div>
            )}

            {/* =========================
                STATS
            ========================== */}

            <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {/* Total Appointments */}

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="rounded-2xl bg-violet-100 p-3 dark:bg-violet-500/10">
                            <Calendar className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                        </div>
                    </div>

                    <p className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
                        {appointments.length}
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Total Appointments
                    </p>
                </div>

                {/* Today's Sessions */}

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="rounded-2xl bg-cyan-100 p-3 dark:bg-cyan-500/10">
                            <Clock3 className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                        </div>
                    </div>

                    <p className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
                        {todaySessions.length}
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Today's Sessions
                    </p>
                </div>

                {/* Pending */}

                <div className="rounded-3xl border border-orange-200 bg-orange-50/50 p-6 shadow-sm dark:border-orange-900/40 dark:bg-orange-950/10">
                    <div className="flex items-center justify-between">
                        <div className="rounded-2xl bg-orange-100 p-3 dark:bg-orange-500/10">
                            <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                        </div>

                        {pendingCount > 0 && (
                            <span className="animate-pulse rounded-full bg-orange-500 px-2.5 py-1 text-xs font-bold text-white">
                                NEW
                            </span>
                        )}
                    </div>

                    <p className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
                        {pendingCount}
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Pending Requests
                    </p>
                </div>

                {/* Approved */}

                <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-sm dark:border-emerald-900/40 dark:bg-emerald-950/10">
                    <div className="flex items-center justify-between">
                        <div className="rounded-2xl bg-emerald-100 p-3 dark:bg-emerald-500/10">
                            <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                    </div>

                    <p className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
                        {approvedCount}
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Approved Sessions
                    </p>
                </div>
            </section>

            {/* =========================
                NEW APPOINTMENT REQUESTS
            ========================== */}

            <section>
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-orange-100 p-2 dark:bg-orange-500/10">
                                <Sparkles className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            </div>

                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                New Appointment Requests
                            </h2>

                            {pendingCount > 0 && (
                                <span className="rounded-full bg-orange-500 px-2.5 py-1 text-xs font-bold text-white">
                                    {pendingCount}
                                </span>
                            )}
                        </div>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            New student requests waiting for your
                            review.
                        </p>
                    </div>

                    <Link
                        href="/counselor/appointments"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                    >
                        View All
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {loading ? (
                    <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <RefreshCw className="mx-auto h-7 w-7 animate-spin text-violet-500" />

                        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                            Loading appointment requests...
                        </p>
                    </div>
                ) : newAppointments.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 p-10 text-center dark:border-slate-700 dark:bg-slate-900/50">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-500/10">
                            <CheckCircle2 className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                        </div>

                        <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
                            All caught up!
                        </h3>

                        <p className="mx-auto mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
                            There are no new appointment requests
                            waiting for your review.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {newAppointments.map(
                            (appointment) => (
                                <Link
                                    key={appointment.id}
                                    href={`/counselor/appointments?id=${appointment.id}`}
                                    className="group block rounded-3xl border border-orange-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-lg dark:border-orange-900/40 dark:bg-slate-900 dark:hover:border-orange-700/60"
                                >
                                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                                        {/* Left */}

                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-2.5 py-1 text-xs font-bold text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">
                                                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" />

                                                    NEW
                                                </span>

                                                <span className="rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium capitalize text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-300">
                                                    {appointment.status}
                                                </span>
                                            </div>

                                            <h3 className="mt-3 truncate text-lg font-bold text-slate-900 transition group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400">
                                                {appointment.title}
                                            </h3>

                                            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Users className="h-4 w-4" />

                                                    Student
                                                </span>

                                                <span className="inline-flex items-center gap-1.5">
                                                    <Calendar className="h-4 w-4" />

                                                    {formatDate(
                                                        appointment.appointment_date
                                                    )}
                                                </span>

                                                <span className="inline-flex items-center gap-1.5">
                                                    <Clock3 className="h-4 w-4" />

                                                    {formatTime(
                                                        appointment.appointment_time
                                                    )}
                                                </span>

                                                <span className="inline-flex items-center gap-1.5">
                                                    <MeetingIcon
                                                        type={
                                                            appointment.meeting_type
                                                        }
                                                    />

                                                    {getMeetingTypeLabel(
                                                        appointment.meeting_type
                                                    )}
                                                </span>
                                            </div>

                                            {appointment.description && (
                                                <p className="mt-3 line-clamp-2 max-w-3xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                                                    {appointment.description}
                                                </p>
                                            )}
                                        </div>

                                        {/* Right */}

                                        <div className="shrink-0">
                                            <span className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition group-hover:bg-violet-700 lg:w-auto">
                                                View Details

                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        )}
                    </div>
                )}
            </section>

            {/* =========================
                UPCOMING SESSIONS
            ========================== */}

            <section>
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-cyan-100 p-2 dark:bg-cyan-500/10">
                                <Clock3 className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                            </div>

                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                Upcoming Sessions
                            </h2>
                        </div>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Your approved counseling sessions.
                        </p>
                    </div>

                    <Link
                        href="/counselor/appointments"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400"
                    >
                        View All
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {upcomingAppointments.length === 0 ? (
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <Calendar className="mx-auto h-8 w-8 text-slate-400" />

                        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                            No upcoming approved sessions.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 lg:grid-cols-2">
                        {upcomingAppointments
                            .slice(0, 4)
                            .map((appointment) => (
                                <Link
                                    key={appointment.id}
                                    href={`/counselor/appointments?id=${appointment.id}`}
                                    className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                                                    Approved
                                                </span>
                                            </div>

                                            <h3 className="mt-3 truncate font-bold text-slate-900 group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400">
                                                {appointment.title}
                                            </h3>
                                        </div>

                                        <ArrowRight className="h-5 w-5 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-violet-500" />
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                Date
                                            </p>

                                            <p className="mt-1 font-medium text-slate-800 dark:text-slate-200">
                                                {formatDate(
                                                    appointment.appointment_date
                                                )}
                                            </p>
                                        </div>

                                        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                Time
                                            </p>

                                            <p className="mt-1 font-medium text-slate-800 dark:text-slate-200">
                                                {formatTime(
                                                    appointment.appointment_time
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                        <MeetingIcon
                                            type={
                                                appointment.meeting_type
                                            }
                                        />

                                        {getMeetingTypeLabel(
                                            appointment.meeting_type
                                        )}
                                    </div>
                                </Link>
                            ))}
                    </div>
                )}
            </section>

            {/* =========================
                QUICK ACTIONS
            ========================== */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-5">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        Quick Actions
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Quickly access your counselor tools.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Link
                        href="/counselor/students"
                        className="group rounded-2xl border border-slate-200 p-5 transition-all hover:-translate-y-1 hover:border-violet-300 hover:shadow-md dark:border-slate-700 dark:hover:border-violet-700"
                    >
                        <Users className="h-6 w-6 text-violet-500" />

                        <p className="mt-3 font-semibold text-slate-900 dark:text-white">
                            Students
                        </p>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Manage student information
                        </p>
                    </Link>

                    <Link
                        href="/counselor/appointments"
                        className="group rounded-2xl border border-slate-200 p-5 transition-all hover:-translate-y-1 hover:border-cyan-300 hover:shadow-md dark:border-slate-700 dark:hover:border-cyan-700"
                    >
                        <Calendar className="h-6 w-6 text-cyan-500" />

                        <p className="mt-3 font-semibold text-slate-900 dark:text-white">
                            Appointments
                        </p>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Review counseling requests
                        </p>
                    </Link>

                    <Link
                        href="/counselor/reports"
                        className="group rounded-2xl border border-slate-200 p-5 transition-all hover:-translate-y-1 hover:border-fuchsia-300 hover:shadow-md dark:border-slate-700 dark:hover:border-fuchsia-700"
                    >
                        <FileText className="h-6 w-6 text-fuchsia-500" />

                        <p className="mt-3 font-semibold text-slate-900 dark:text-white">
                            Reports
                        </p>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            View wellness reports
                        </p>
                    </Link>

                    <Link
                        href="/counselor/ai-assistant"
                        className="group rounded-2xl border border-slate-200 p-5 transition-all hover:-translate-y-1 hover:border-violet-300 hover:shadow-md dark:border-slate-700 dark:hover:border-violet-700"
                    >
                        <Brain className="h-6 w-6 text-violet-500" />

                        <p className="mt-3 font-semibold text-slate-900 dark:text-white">
                            AI Assistant
                        </p>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Get AI-powered insights
                        </p>
                    </Link>
                </div>
            </section>
        </div>
    );
}