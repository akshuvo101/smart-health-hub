"use client";

import { FormEvent, useState } from "react";
import { CalendarPlus, Loader2 } from "lucide-react";

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

  const [loading, setLoading] =
    useState(false);

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
        "Appointment booked successfully. Your request is now pending approval."
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
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
          <CalendarPlus className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Book Appointment
          </h2>

          <p className="text-sm text-slate-500">
            Schedule a session with a wellness counselor.
          </p>
        </div>
      </div>

      {successMessage && (
        <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
          {errorMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
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
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Preferred Date
          </label>

          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={appointmentDate}
            onChange={(e) =>
              setAppointmentDate(
                e.target.value
              )
            }
            required
            disabled={loading}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
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
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Meeting Type
          </label>

          <select
            value={meetingType}
            onChange={(e) =>
              setMeetingType(
                e.target
                  .value as MeetingType
              )
            }
            disabled={loading}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="In Person">
              In Person
            </option>

            <option value="Online">
              Online
            </option>

            <option value="Phone">
              Phone
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Reason
          </label>

          <textarea
            maxLength={500}
            rows={5}
            placeholder="Briefly describe why you would like to schedule this appointment..."
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            disabled={loading}
            className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800"
          />
          <div className="text-right text-xs text-slate-400">
            {description.length}/500
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Booking Appointment...
            </>
          ) : (
            <>
              <CalendarPlus className="h-5 w-5" />
              Book Appointment
            </>
          )}
        </button>
      </form>
    </div>
  );
}