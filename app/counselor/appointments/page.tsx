"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  User,
  Video,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Check,
  X,
} from "lucide-react";

import { useCounselorAppointments } from "@/hooks/useCounselorAppointments";

type FilterStatus =
  | "all"
  | "pending"
  | "approved"
  | "completed"
  | "cancelled";

export default function CounselorAppointmentsPage() {
  const {
    appointments,
    loading,
    error,
    acceptAppointment,
    cancelAppointment,
  } = useCounselorAppointments();

  const [activeFilter, setActiveFilter] =
    useState<FilterStatus>("all");

  const [processingId, setProcessingId] =
    useState<string | null>(null);

  // ----------------------------------------
  // Filter appointments
  // ----------------------------------------

  const filteredAppointments = useMemo(() => {
    if (activeFilter === "all") {
      return appointments;
    }

    return appointments.filter(
      (appointment) =>
        appointment.status === activeFilter
    );
  }, [appointments, activeFilter]);

  // ----------------------------------------
  // Counts
  // ----------------------------------------

  const counts = useMemo(
    () => ({
      all: appointments.length,

      pending: appointments.filter(
        (a) => a.status === "pending"
      ).length,

      approved: appointments.filter(
        (a) => a.status === "approved"
      ).length,

      completed: appointments.filter(
        (a) => a.status === "completed"
      ).length,

      cancelled: appointments.filter(
        (a) => a.status === "cancelled"
      ).length,
    }),
    [appointments]
  );

  // ----------------------------------------
  // Accept
  // ----------------------------------------

  const handleAccept = async (id: string) => {
    try {
      setProcessingId(id);

      await acceptAppointment(id);
    } catch (error) {
      console.error(
        "Failed to accept appointment:",
        error
      );
    } finally {
      setProcessingId(null);
    }
  };

  // ----------------------------------------
  // Cancel
  // ----------------------------------------

  const handleCancel = async (id: string) => {
    try {
      setProcessingId(id);

      await cancelAppointment(id);
    } catch (error) {
      console.error(
        "Failed to cancel appointment:",
        error
      );
    } finally {
      setProcessingId(null);
    }
  };

  // ----------------------------------------
  // Status style
  // ----------------------------------------

  const getStatusStyle = (
    status: string
  ) => {
    switch (status) {
      case "pending":
        return "bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400";

      case "approved":
        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400";

      case "completed":
        return "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400";

      case "cancelled":
        return "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400";

      default:
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
    }
  };

  // ----------------------------------------
  // Filter tabs
  // ----------------------------------------

  const filters: {
    key: FilterStatus;
    label: string;
  }[] = [
    {
      key: "all",
      label: "All",
    },
    {
      key: "pending",
      label: "Pending",
    },
    {
      key: "approved",
      label: "Approved",
    },
    {
      key: "completed",
      label: "Completed",
    },
    {
      key: "cancelled",
      label: "Cancelled",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Appointments
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage student counseling appointments.
        </p>
      </div>

      {/* Error */}

      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />

          <span>{error}</span>
        </div>
      )}

      {/* Appointment Container */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Top */}

        <div className="border-b border-slate-200 px-5 pt-4 dark:border-slate-800">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Student Appointments
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                {counts.all} total
              </p>
            </div>

            {/* Filter */}

            <div className="flex w-full overflow-x-auto rounded-xl bg-slate-100 p-1 dark:bg-slate-800 sm:w-auto">
              {filters.map((filter) => {
                const active =
                  activeFilter === filter.key;

                return (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() =>
                      setActiveFilter(filter.key)
                    }
                    className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                      active
                        ? "bg-white text-violet-600 shadow-sm dark:bg-slate-700 dark:text-violet-400"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    }`}
                  >
                    {filter.label}

                    <span
                      className={`text-[10px] ${
                        active
                          ? "text-violet-500"
                          : "text-slate-400"
                      }`}
                    >
                      {counts[filter.key]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 h-px bg-transparent" />
        </div>

        {/* Loading */}

        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-5 w-5 animate-spin text-violet-500" />
          </div>
        )}

        {/* Empty */}

        {!loading &&
          filteredAppointments.length === 0 && (
            <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                <CalendarDays className="h-5 w-5 text-slate-400" />
              </div>

              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                No {activeFilter === "all"
                  ? ""
                  : activeFilter} appointments
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Nothing to show here.
              </p>
            </div>
          )}

        {/* Appointment List */}

        {!loading &&
          filteredAppointments.length > 0 && (
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredAppointments.map(
                (appointment) => {
                  const isProcessing =
                    processingId === appointment.id;

                  return (
                    <div
                      key={appointment.id}
                      className="px-5 py-4 transition hover:bg-slate-50/60 dark:hover:bg-slate-800/30"
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        {/* Information */}

                        <div className="min-w-0">
                          {/* Title + Status */}

                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                              {appointment.title}
                            </h3>

                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${getStatusStyle(
                                appointment.status
                              )}`}
                            >
                              {appointment.status}
                            </span>
                          </div>

                          {/* Details */}

                          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1.5">
                              <User className="h-3.5 w-3.5" />

                              <span className="max-w-[190px] truncate">
                                {appointment.student_id}
                              </span>
                            </span>

                            <span className="flex items-center gap-1.5">
                              <CalendarDays className="h-3.5 w-3.5" />

                              {appointment.appointment_date}
                            </span>

                            <span className="flex items-center gap-1.5">
                              <Clock3 className="h-3.5 w-3.5" />

                              {appointment.appointment_time}
                            </span>

                            <span>
                              {appointment.meeting_type}
                            </span>
                          </div>

                          {/* Description */}

                          {appointment.description && (
                            <p className="mt-2 max-w-2xl truncate text-xs text-slate-400">
                              {appointment.description}
                            </p>
                          )}
                        </div>

                        {/* Actions */}

                        <div className="flex shrink-0 items-center gap-2">
                          {/* Pending */}

                          {appointment.status ===
                            "pending" && (
                            <>
                              <button
                                type="button"
                                disabled={
                                  isProcessing
                                }
                                onClick={() =>
                                  handleAccept(
                                    appointment.id
                                  )
                                }
                                className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {isProcessing ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Check className="h-3.5 w-3.5" />
                                )}

                                Accept
                              </button>

                              <button
                                type="button"
                                disabled={
                                  isProcessing
                                }
                                onClick={() =>
                                  handleCancel(
                                    appointment.id
                                  )
                                }
                                className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
                              >
                                <X className="h-3.5 w-3.5" />

                                Cancel
                              </button>
                            </>
                          )}

                          {/* Approved */}

                          {appointment.status ===
                            "approved" && (
                            <>
                              <button
                                type="button"
                                className="flex items-center gap-1.5 rounded-lg bg-violet-500 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-violet-600"
                              >
                                <Video className="h-3.5 w-3.5" />

                                Join
                              </button>

                              <button
                                type="button"
                                disabled={
                                  isProcessing
                                }
                                onClick={() =>
                                  handleCancel(
                                    appointment.id
                                  )
                                }
                                className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
                              >
                                <X className="h-3.5 w-3.5" />

                                Cancel
                              </button>
                            </>
                          )}

                          {/* Completed */}

                          {appointment.status ===
                            "completed" && (
                            <span className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
                              <CheckCircle2 className="h-3.5 w-3.5" />

                              Completed
                            </span>
                          )}

                          {/* Cancelled */}

                          {appointment.status ===
                            "cancelled" && (
                            <span className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600 dark:bg-red-950/30 dark:text-red-400">
                              <X className="h-3.5 w-3.5" />

                              Cancelled
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
      </section>
    </div>
  );
}