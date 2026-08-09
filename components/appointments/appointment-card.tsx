"use client";

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
} from "lucide-react";

import { Appointment } from "@/types/appointment";

interface AppointmentCardProps {
  appointments: Appointment[];
  loading: boolean;
}

const statusStyles = {
  pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",

  approved:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",

  completed:
    "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",

  cancelled:
    "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
};

export default function AppointmentCard({
  appointments,
  loading,
}: AppointmentCardProps) {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = (time: string) =>
    new Date(`1970-01-01T${time}`).toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );

  const getMeetingIcon = (type: string) => {
    switch (type) {
      case "Online":
        return (
          <Video className="h-5 w-5 text-emerald-500" />
        );

      case "Phone":
        return (
          <Phone className="h-5 w-5 text-emerald-500" />
        );

      default:
        return (
          <Building2 className="h-5 w-5 text-emerald-500" />
        );
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
        <div className="flex items-center justify-center gap-3 py-16">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />

          <p className="text-slate-500">
            Loading appointments...
          </p>
        </div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <CalendarDays className="mb-4 h-16 w-16 text-slate-300" />

          <h3 className="text-xl font-semibold">
            No Appointments Yet
          </h3>

          <p className="mt-2 max-w-md text-slate-500">
            You haven't booked any counseling
            appointments yet. Use the form to
            schedule your first wellness session.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="rounded-3xl bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-slate-900"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[appointment.status]
                  }`}
              >
                {appointment.status === "approved" && (
                  <CheckCircle2 className="mr-1 h-4 w-4" />
                )}

                {appointment.status === "cancelled" && (
                  <XCircle className="mr-1 h-4 w-4" />
                )}

                {appointment.status}
              </span>

              <h3 className="mt-4 text-xl font-semibold">
                {appointment.title}
              </h3>

              {appointment.description && (
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {appointment.description}
                </p>
              )}
            </div>

            <div className="rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
              {appointment.meeting_type}
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
              <User className="h-5 w-5 text-emerald-500" />

              <span>
                {appointment.counselor_id
                  ? "Counselor Assigned"
                  : "Waiting for Counselor Assignment"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
              {getMeetingIcon(
                appointment.meeting_type
              )}

              <span>
                {appointment.meeting_type}
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
              <Calendar className="h-5 w-5 text-emerald-500" />

              <span>
                {formatDate(
                  appointment.appointment_date
                )}
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
              <Clock className="h-5 w-5 text-emerald-500" />

              <span>
                {formatTime(
                  appointment.appointment_time
                )}
              </span>
            </div>
          </div>

          {appointment.notes && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <h4 className="mb-2 text-sm font-semibold">
                Counselor Notes
              </h4>

              <p className="text-sm text-slate-600 dark:text-slate-400">
                {appointment.notes}
              </p>
            </div>
          )}

          {appointment.meeting_link && (
            <div className="mt-6">
              <a
                href={appointment.meeting_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-600"
              >
                Join Online Meeting
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}