"use client";

import { useMemo, useState } from "react";

import {
  Calendar,
  Clock,
  User,
  Video,
  Phone,
  Building2,
  CheckCircle2,
  XCircle,
  Loader2,
  CalendarDays,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

import { Appointment } from "@/types/appointment";

interface AppointmentCardProps {
  appointments: Appointment[];
  loading: boolean;
}

type FilterType =
  | "all"
  | "pending"
  | "approved"
  | "completed"
  | "cancelled";

const statusStyles = {
  pending: {
    badge:
      "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20",
    dot: "bg-amber-500",
  },

  approved: {
    badge:
      "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20",
    dot: "bg-emerald-500",
  },

  completed: {
    badge:
      "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20",
    dot: "bg-blue-500",
  },

  cancelled: {
    badge:
      "bg-red-50 text-red-700 ring-red-200 dark:bg-red-500/10 dark:text-red-300 dark:ring-red-500/20",
    dot: "bg-red-500",
  },
};

export default function AppointmentCard({
  appointments,
  loading,
}: AppointmentCardProps) {
  const [filter, setFilter] =
    useState<FilterType>("all");

  const [expandedId, setExpandedId] =
    useState<string | null>(null);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const formatTime = (time: string) =>
    new Date(
      `1970-01-01T${time}`
    ).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const getMeetingIcon = (type: string) => {
    switch (type) {
      case "Online":
        return (
          <Video className="h-4 w-4 text-emerald-500" />
        );

      case "Phone":
        return (
          <Phone className="h-4 w-4 text-emerald-500" />
        );

      default:
        return (
          <Building2 className="h-4 w-4 text-emerald-500" />
        );
    }
  };

  const counts = useMemo(() => {
    return {
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
    };
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    if (filter === "all") {
      return appointments;
    }

    return appointments.filter(
      (appointment) =>
        appointment.status === filter
    );
  }, [appointments, filter]);

  const filters: {
    key: FilterType;
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

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-center gap-2 py-12">
          <Loader2 className="h-5 w-5 animate-spin text-emerald-500" />

          <p className="text-sm text-slate-500">
            Loading appointments...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-100 px-4 py-4 dark:border-slate-800 sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-emerald-500" />

              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                My Appointments
              </h2>
            </div>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Manage and track your counseling sessions.
            </p>
          </div>

          <div className="text-xs text-slate-400">
            {appointments.length} total
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1">
          {filters.map((item) => {
            const active = filter === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setFilter(item.key);
                  setExpandedId(null);
                }}
                className={`
                  flex shrink-0 items-center gap-1.5
                  rounded-lg px-2.5 py-1.5
                  text-[11px] font-semibold
                  transition-all
                  ${
                    active
                      ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                  }
                `}
              >
                {item.label}

                <span
                  className={`
                    rounded-md px-1.5 py-0.5 text-[10px]
                    ${
                      active
                        ? "bg-white/15 text-current dark:bg-slate-900/10"
                        : "bg-white text-slate-500 dark:bg-slate-900"
                    }
                  `}
                >
                  {counts[item.key]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Appointment List */}
      <div className="p-3 sm:p-4">
        {filteredAppointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-12 text-center dark:border-slate-700">
            <CalendarDays className="mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />

            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No {filter === "all" ? "" : filter} appointments
            </h3>

            <p className="mt-1 max-w-sm text-xs text-slate-400">
              {filter === "all"
                ? "You haven't booked any counseling sessions yet."
                : `There are no ${filter} appointments at the moment.`}
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredAppointments.map(
              (appointment) => {
                const isExpanded =
                  expandedId === appointment.id;

                const style =
                  statusStyles[appointment.status];

                return (
                  <div
                    key={appointment.id}
                    className="
                      overflow-hidden rounded-xl
                      border border-slate-200
                      bg-slate-50/50
                      transition-all
                      hover:border-slate-300
                      hover:bg-white
                      dark:border-slate-800
                      dark:bg-slate-800/30
                      dark:hover:border-slate-700
                      dark:hover:bg-slate-800/50
                    "
                  >
                    {/* Main Row */}
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId(
                          isExpanded
                            ? null
                            : appointment.id
                        )
                      }
                      className="w-full px-3 py-3 text-left sm:px-4"
                    >
                      <div className="flex items-center gap-3">
                        {/* Status Dot */}
                        <span
                          className={`h-2 w-2 shrink-0 rounded-full ${style.dot}`}
                        />

                        {/* Main Content */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                            <h3 className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                              {appointment.title}
                            </h3>

                            <span
                              className={`
                                inline-flex w-fit
                                items-center gap-1
                                rounded-md px-1.5 py-0.5
                                text-[9px] font-bold uppercase
                                tracking-wide ring-1
                                ${style.badge}
                              `}
                            >
                              {appointment.status ===
                                "approved" && (
                                <CheckCircle2 className="h-2.5 w-2.5" />
                              )}

                              {appointment.status ===
                                "cancelled" && (
                                <XCircle className="h-2.5 w-2.5" />
                              )}

                              {appointment.status}
                            </span>
                          </div>

                          {/* Compact Info */}
                          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />

                              {formatDate(
                                appointment.appointment_date
                              )}
                            </span>

                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />

                              {formatTime(
                                appointment.appointment_time
                              )}
                            </span>

                            <span className="flex items-center gap-1">
                              {getMeetingIcon(
                                appointment.meeting_type
                              )}

                              {appointment.meeting_type}
                            </span>
                          </div>
                        </div>

                        {/* Counselor + Arrow */}
                        <div className="hidden items-center gap-3 sm:flex">
                          <span className="text-[10px] text-slate-400">
                            {appointment.counselor_id
                              ? "Counselor assigned"
                              : "Unassigned"}
                          </span>
                        </div>

                        <ChevronDown
                          className={`
                            h-4 w-4 shrink-0
                            text-slate-400
                            transition-transform
                            ${
                              isExpanded
                                ? "rotate-180"
                                : ""
                            }
                          `}
                        />
                      </div>
                    </button>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="border-t border-slate-200 bg-white px-3 py-3 dark:border-slate-800 dark:bg-slate-900 sm:px-4">
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          {/* Counselor */}
                          <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                              Counselor
                            </p>

                            <div className="mt-1.5 flex items-center gap-2">
                              <User className="h-3.5 w-3.5 text-emerald-500" />

                              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                {appointment.counselor_id
                                  ? "Counselor Assigned"
                                  : "Waiting for Assignment"}
                              </span>
                            </div>
                          </div>

                          {/* Meeting */}
                          <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                              Meeting Type
                            </p>

                            <div className="mt-1.5 flex items-center gap-2">
                              {getMeetingIcon(
                                appointment.meeting_type
                              )}

                              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                {appointment.meeting_type}
                              </span>
                            </div>
                          </div>

                          {/* Date & Time */}
                          <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                              Schedule
                            </p>

                            <div className="mt-1.5 flex items-center gap-2">
                              <Calendar className="h-3.5 w-3.5 text-emerald-500" />

                              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                {formatDate(
                                  appointment.appointment_date
                                )}{" "}
                                ·{" "}
                                {formatTime(
                                  appointment.appointment_time
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        {appointment.description && (
                          <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
                            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                              Reason
                            </p>

                            <p className="mt-1.5 text-xs leading-5 text-slate-600 dark:text-slate-400">
                              {appointment.description}
                            </p>
                          </div>
                        )}

                        {/* Counselor Notes */}
                        {appointment.notes && (
                          <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
                            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                              Counselor Notes
                            </p>

                            <p className="mt-1.5 text-xs leading-5 text-slate-600 dark:text-slate-400">
                              {appointment.notes}
                            </p>
                          </div>
                        )}

                        {/* Meeting Link */}
                        {appointment.meeting_link && (
                          <div className="mt-3">
                            <a
                              href={
                                appointment.meeting_link
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="
                                inline-flex items-center gap-2
                                rounded-lg
                                bg-emerald-500
                                px-3 py-2
                                text-xs font-semibold
                                text-white
                                transition
                                hover:bg-emerald-600
                              "
                              onClick={(e) =>
                                e.stopPropagation()
                              }
                            >
                              Join Online Meeting

                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
}