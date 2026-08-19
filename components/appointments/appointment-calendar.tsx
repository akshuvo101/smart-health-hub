"use client";

import { useMemo, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

import { Appointment } from "@/types/appointment";

interface AppointmentCalendarProps {
  appointments: Appointment[];
}

const WEEK_DAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export default function AppointmentCalendar({
  appointments,
}: AppointmentCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(
    new Date()
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const today = new Date();

  const previousMonth = () => {
    setCurrentMonth(
      new Date(year, month - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(year, month + 1, 1)
    );
  };

  const appointmentMap = useMemo(() => {
    const map = new Map<string, Appointment>();

    appointments.forEach((appointment) => {
      /*
       * If multiple appointments exist on the same date,
       * the latest one will be displayed.
       */
      map.set(
        appointment.appointment_date,
        appointment
      );
    });

    return map;
  }, [appointments]);

  const isToday = (day: number) => {
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  const getAppointment = (day: number) => {
    const dateKey = `${year}-${String(
      month + 1
    ).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;

    return appointmentMap.get(dateKey);
  };

  const monthName =
    currentMonth.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

  const calendarCells: (number | null)[] = [];

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    calendarCells.push(null);
  }

  // Days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">

      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3">

        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-500/10">
            <CalendarDays className="h-4 w-4 text-emerald-500" />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
              Appointment Calendar
            </h2>

            <p className="hidden text-[11px] text-slate-500 sm:block">
              Your scheduled sessions
            </p>
          </div>
        </div>

        {/* Month Navigation */}
        <div className="flex shrink-0 items-center gap-1">

          <button
            type="button"
            onClick={previousMonth}
            aria-label="Previous month"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>

          <span className="min-w-[90px] text-center text-xs font-semibold text-slate-700 dark:text-slate-200">
            {monthName}
          </span>

          <button
            type="button"
            onClick={nextMonth}
            aria-label="Next month"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>

        </div>
      </div>

      {/* Calendar */}
      <div className="overflow-hidden">

        {/* Week Days */}
        <div className="mb-1 grid grid-cols-7 gap-1">

          {WEEK_DAYS.map((day) => (
            <div
              key={day}
              className="py-1 text-center text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 sm:text-[11px]"
            >
              {day}
            </div>
          ))}

        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">

          {calendarCells.map((day, index) => {

            if (day === null) {
              return (
                <div
                  key={`empty-${index}`}
                  className="h-8 sm:h-9"
                />
              );
            }

            const todayDate = isToday(day);
            const appointment =
              getAppointment(day);

            const status =
              appointment?.status;

            return (
              <div
                key={day}
                title={
                  appointment
                    ? `${appointment.title} • ${status}`
                    : undefined
                }
                className={`
                  relative flex
                  h-8
                  items-center
                  justify-center
                  rounded-lg
                  border
                  text-[11px]
                  font-medium
                  transition-all
                  sm:h-9
                  sm:text-xs

                  ${
                    status === "pending"
                      ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300"
                      : status === "approved"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
                        : status === "completed"
                          ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300"
                          : status === "cancelled"
                            ? "border-red-200 bg-red-50 text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
                            : "border-slate-100 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
                  }

                  ${
                    todayDate
                      ? "ring-2 ring-emerald-400 ring-offset-1 dark:ring-offset-slate-900"
                      : ""
                  }
                `}
              >
                {day}

                {/* Appointment Indicator */}
                {appointment && (
                  <span
                    className={`
                      absolute
                      bottom-0.5
                      h-1
                      w-1
                      rounded-full

                      ${
                        status === "pending"
                          ? "bg-amber-500"
                          : status === "approved"
                            ? "bg-emerald-500"
                            : status === "completed"
                              ? "bg-blue-500"
                              : "bg-red-500"
                      }
                    `}
                  />
                )}

                {/* Today Indicator */}
                {todayDate && (
                  <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                )}
              </div>
            );
          })}

        </div>
      </div>

      {/* Compact Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-3 dark:border-slate-800">

        <Legend
          label="Pending"
          className="bg-amber-400"
        />

        <Legend
          label="Approved"
          className="bg-emerald-500"
        />

        <Legend
          label="Completed"
          className="bg-blue-500"
        />

        <Legend
          label="Cancelled"
          className="bg-red-500"
        />

        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 sm:text-[11px]">
          <span className="h-2.5 w-2.5 rounded-full border-2 border-emerald-400" />
          <span>Today</span>
        </div>

      </div>
    </div>
  );
}

/* -------------------------------------------------------
   Legend Item
------------------------------------------------------- */

function Legend({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 sm:text-[11px]">
      <span
        className={`h-2.5 w-2.5 rounded-sm ${className}`}
      />

      <span>{label}</span>
    </div>
  );
}