"use client";

import { FormEvent, useState } from "react";

import {
  CalendarPlus,
  Loader2,
  CalendarDays,
  Clock3,
  Video,
  Phone,
  Building2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { useAppointments } from "@/hooks/useAppointments";

import {
  CreateAppointmentInput,
  MeetingType,
} from "@/types/appointment";

interface AppointmentFormProps {
  onSuccess?: () => void;
}

export default function AppointmentForm({
  onSuccess,
}: AppointmentFormProps) {
  const { createAppointment } = useAppointments();

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [appointmentDate, setAppointmentDate] =
    useState("");

  const [appointmentTime, setAppointmentTime] =
    useState("");

  const [meetingType, setMeetingType] =
    useState<MeetingType>("In Person");

  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setAppointmentDate("");
    setAppointmentTime("");
    setMeetingType("In Person");
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const payload: CreateAppointmentInput = {
        title,
        description,
        appointment_date: appointmentDate,
        appointment_time: appointmentTime,
        meeting_type: meetingType,
        assessment_id: null,
      };

      await createAppointment(payload);

      resetForm();

      setSuccessMessage(
        "Appointment request submitted successfully."
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);

      onSuccess?.();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to book appointment."
      );
    } finally {
      setLoading(false);
    }
  };

  const today =
    new Date().toISOString().split("T")[0];

  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">

      {/* Header */}
      <div className="mb-5 flex items-center gap-3">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10">
          <CalendarPlus className="h-4.5 w-4.5 text-emerald-500" />
        </div>

        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
            Book Appointment
          </h2>

          <p className="mt-0.5 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
            Schedule a session with a wellness counselor.
          </p>
        </div>

      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">

          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />

          <span>{successMessage}</span>

        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">

          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />

          <span>{errorMessage}</span>

        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-3.5"
      >

        {/* Appointment Title */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
            Appointment Title
          </label>

          <input
            type="text"
            placeholder="e.g. Stress Management Session"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
            disabled={loading}
            className="
              h-10
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-3
              text-xs
              text-slate-900
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-emerald-500
              focus:bg-white
              focus:ring-2
              focus:ring-emerald-500/10
              disabled:cursor-not-allowed
              disabled:opacity-60
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
              dark:focus:bg-slate-800
            "
          />
        </div>

        {/* Date + Time */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

          {/* Date */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300">
              <CalendarDays className="h-3.5 w-3.5 text-emerald-500" />
              Preferred Date
            </label>

            <input
              type="date"
              min={today}
              value={appointmentDate}
              onChange={(e) =>
                setAppointmentDate(
                  e.target.value
                )
              }
              required
              disabled={loading}
              className="
                h-10
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-3
                text-xs
                text-slate-700
                outline-none
                transition
                focus:border-emerald-500
                focus:bg-white
                focus:ring-2
                focus:ring-emerald-500/10
                disabled:cursor-not-allowed
                disabled:opacity-60
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-200
              "
            />
          </div>

          {/* Time */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300">
              <Clock3 className="h-3.5 w-3.5 text-emerald-500" />
              Preferred Time
            </label>

            <input
              type="time"
              min="09:00"
              max="17:00"
              value={appointmentTime}
              onChange={(e) =>
                setAppointmentTime(
                  e.target.value
                )
              }
              required
              disabled={loading}
              className="
                h-10
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-3
                text-xs
                text-slate-700
                outline-none
                transition
                focus:border-emerald-500
                focus:bg-white
                focus:ring-2
                focus:ring-emerald-500/10
                disabled:cursor-not-allowed
                disabled:opacity-60
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-200
              "
            />
          </div>

        </div>

        {/* Meeting Type */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
            Meeting Type
          </label>

          <div className="grid grid-cols-3 gap-2">

            {/* In Person */}
            <button
              type="button"
              disabled={loading}
              onClick={() =>
                setMeetingType("In Person")
              }
              className={`
                flex
                h-10
                items-center
                justify-center
                gap-1.5
                rounded-xl
                border
                text-[11px]
                font-medium
                transition-all

                ${
                  meetingType === "In Person"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm dark:border-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-300"
                    : "border-slate-200 bg-slate-50 text-slate-500 hover:border-emerald-300 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                }
              `}
            >
              <Building2 className="h-3.5 w-3.5" />
              <span className="hidden xs:inline">
                In Person
              </span>
              <span className="xs:hidden">
                In-Person
              </span>
            </button>

            {/* Online */}
            <button
              type="button"
              disabled={loading}
              onClick={() =>
                setMeetingType("Online")
              }
              className={`
                flex
                h-10
                items-center
                justify-center
                gap-1.5
                rounded-xl
                border
                text-[11px]
                font-medium
                transition-all

                ${
                  meetingType === "Online"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm dark:border-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-300"
                    : "border-slate-200 bg-slate-50 text-slate-500 hover:border-emerald-300 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                }
              `}
            >
              <Video className="h-3.5 w-3.5" />
              Online
            </button>

            {/* Phone */}
            <button
              type="button"
              disabled={loading}
              onClick={() =>
                setMeetingType("Phone")
              }
              className={`
                flex
                h-10
                items-center
                justify-center
                gap-1.5
                rounded-xl
                border
                text-[11px]
                font-medium
                transition-all

                ${
                  meetingType === "Phone"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm dark:border-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-300"
                    : "border-slate-200 bg-slate-50 text-slate-500 hover:border-emerald-300 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                }
              `}
            >
              <Phone className="h-3.5 w-3.5" />
              Phone
            </button>

          </div>
        </div>

        {/* Reason */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">

            <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Reason
            </label>

            <span className="text-[10px] text-slate-400">
              {description.length}/500
            </span>

          </div>

          <textarea
            maxLength={500}
            rows={3}
            placeholder="Briefly describe what you'd like support with..."
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            disabled={loading}
            className="
              min-h-[78px]
              w-full
              resize-none
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-3
              py-2.5
              text-xs
              leading-5
              text-slate-900
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-emerald-500
              focus:bg-white
              focus:ring-2
              focus:ring-emerald-500/10
              disabled:cursor-not-allowed
              disabled:opacity-60
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
              dark:focus:bg-slate-800
            "
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            flex
            h-10
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-emerald-500
            to-teal-500
            px-4
            text-xs
            font-semibold
            text-white
            shadow-sm
            transition-all
            hover:-translate-y-0.5
            hover:shadow-md
            active:translate-y-0
            disabled:cursor-not-allowed
            disabled:opacity-60
            disabled:hover:translate-y-0
          "
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Booking...
            </>
          ) : (
            <>
              <CalendarPlus className="h-4 w-4" />
              Book Appointment
            </>
          )}
        </button>

        {/* Small Helper Text */}
        <p className="text-center text-[10px] leading-4 text-slate-400">
          Your request will remain pending until a
          counselor reviews it.
        </p>

      </form>
    </div>
  );
}