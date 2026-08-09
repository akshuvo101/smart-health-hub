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
  const [currentMonth, setCurrentMonth] =
    useState(new Date());

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

  const today = new Date();

  const appointmentMap = useMemo(() => {
    const map = new Map<string, Appointment>();

    appointments.forEach((appointment) => {
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
    currentMonth.toLocaleDateString(
      "en-US",
      {
        month: "long",
        year: "numeric",
      }
    );

  const calendarCells = [];

  for (
    let i = 0;
    i < firstDay;
    i++
  ) {
    calendarCells.push(null);
  }

  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {
    calendarCells.push(day);
  }
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-6 w-6 text-emerald-500" />

          <h2 className="text-xl font-semibold">
            Appointment Calendar
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={previousMonth}
            className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <h3 className="min-w-[150px] text-center font-semibold">
            {monthName}
          </h3>

          <button
            onClick={nextMonth}
            className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-7 gap-2">
        {WEEK_DAYS.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-sm font-semibold text-slate-500"
          >
            {day}
          </div>
        ))}

        {calendarCells.map((day, index) => {
          if (day === null) {
            return (
              <div
                key={`empty-${index}`}
                className="h-12"
              />
            );
          }

          const today = isToday(day);

          const appointment =
            getAppointment(day);

          return (
            <div
              key={day}
              className={`
relative flex h-12 items-center justify-center rounded-xl border text-sm font-semibold transition-all
${today
                  ? "ring-2 ring-blue-500"
                  : ""
                }

${appointment?.status === "pending"
                  ? "bg-amber-400 text-white border-amber-400"

                  : appointment?.status === "approved"
                    ? "bg-emerald-500 text-white border-emerald-500"

                    : appointment?.status === "completed"
                      ? "bg-blue-500 text-white border-blue-500"

                      : appointment?.status === "cancelled"
                        ? "bg-red-500 text-white border-red-500"

                        : "border-slate-200 dark:border-slate-700"
                }
`}
            >
              {day}

              {appointment && !today && (
                <span className="absolute bottom-1 h-2 w-2 rounded-full bg-white" />
              )}

              {today && (
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-blue-500" />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-5 text-sm">

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-amber-400" />
          <span>Pending</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-emerald-500" />
          <span>Approved</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-blue-500" />
          <span>Completed</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-red-500" />
          <span>Cancelled</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full border-2 border-blue-500 bg-white dark:bg-slate-900" />
          <span>Today</span>
        </div>

      </div>
    </div>
  );
}