import AppointmentForm from "@/components/appointments/appointment-form";
import AppointmentCard from "@/components/appointments/appointment-card";
import AppointmentCalendar from "@/components/appointments/appointment-calendar";

export default function AppointmentsPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold">
          Counseling Appointments
        </h1>

        <p className="mt-3 max-w-2xl text-white/90">
          Book wellness sessions, track upcoming appointments,
          and connect with professional counselors.
        </p>
      </section>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
          <p className="text-sm text-slate-500">
            Upcoming Sessions
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            2
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
          <p className="text-sm text-slate-500">
            Completed Sessions
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            14
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
          <p className="text-sm text-slate-500">
            Assigned Counselor
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            Dr. Sarah Ahmed
          </h2>
        </div>
      </section>

      {/* Main */}

      <section className="grid gap-6 xl:grid-cols-3">
        <AppointmentForm />

        <div className="space-y-6 xl:col-span-2">
          <AppointmentCard />

          <AppointmentCalendar />
        </div>
      </section>
    </div>
  );
}