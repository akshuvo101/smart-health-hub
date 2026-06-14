import {
  User,
  Bell,
  Shield,
  Brain,
  Lock,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function DoctorSettingsPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-black p-8 text-white shadow-2xl">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10">
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
            Account Management
          </span>

          <h1 className="mt-5 text-4xl font-bold lg:text-5xl">
            Settings
          </h1>

          <p className="mt-4 max-w-3xl text-white/80">
            Manage your profile, notifications, security,
            AI preferences and account settings.
          </p>
        </div>
      </section>

      {/* Profile */}

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-3">
          <User className="h-6 w-6 text-cyan-500" />

          <h2 className="text-xl font-semibold">
            Doctor Profile
          </h2>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex flex-col items-center">
            <div
              className="
                flex
                h-28
                w-28
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-cyan-500
                to-blue-600
                text-3xl
                font-bold
                text-white
              "
            >
              DR
            </div>

            <button className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm dark:border-slate-700">
              <Camera className="h-4 w-4" />
              Change Photo
            </button>
          </div>

          <div className="grid flex-1 gap-5 md:grid-cols-2">
            <input
              placeholder="Full Name"
              defaultValue="Dr. John Smith"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800"
            />

            <input
              placeholder="Specialization"
              defaultValue="Psychiatrist"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800"
            />

            <input
              placeholder="Email"
              defaultValue="doctor@example.com"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800"
            />

            <input
              placeholder="Phone"
              defaultValue="+1 555 123 456"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800"
            />
          </div>
        </div>
      </section>

      {/* Contact */}

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Mail className="h-10 w-10 text-cyan-500" />

          <h3 className="mt-4 font-semibold">
            Email Contact
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            doctor@example.com
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Phone className="h-10 w-10 text-emerald-500" />

          <h3 className="mt-4 font-semibold">
            Phone Number
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            +1 555 123 456
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <MapPin className="h-10 w-10 text-orange-500" />

          <h3 className="mt-4 font-semibold">
            Office Location
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Main Wellness Center
          </p>
        </div>
      </section>

      {/* Notifications */}

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-3">
          <Bell className="h-6 w-6 text-amber-500" />

          <h2 className="text-xl font-semibold">
            Notifications
          </h2>
        </div>

        <div className="space-y-4">
          {[
            "Appointment Notifications",
            "Patient Assessment Alerts",
            "AI Insight Notifications",
            "Email Updates",
          ].map((item) => (
            <label
              key={item}
              className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"
            >
              <span>{item}</span>

              <input
                type="checkbox"
                defaultChecked
                className="h-5 w-5"
              />
            </label>
          ))}
        </div>
      </section>

      {/* AI Preferences */}

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-3">
          <Brain className="h-6 w-6 text-violet-500" />

          <h2 className="text-xl font-semibold">
            AI Preferences
          </h2>
        </div>

        <div className="space-y-4">
          {[
            "Enable AI Treatment Suggestions",
            "Enable AI Clinical Reports",
            "Enable Risk Detection Alerts",
            "Enable Predictive Insights",
          ].map((item) => (
            <label
              key={item}
              className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"
            >
              <span>{item}</span>

              <input
                type="checkbox"
                defaultChecked
                className="h-5 w-5"
              />
            </label>
          ))}
        </div>
      </section>

      {/* Security */}

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-3">
          <Shield className="h-6 w-6 text-emerald-500" />

          <h2 className="text-xl font-semibold">
            Security
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <input
            type="password"
            placeholder="New Password"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800"
          />
        </div>

        <button
          className="
            mt-5
            flex
            items-center
            gap-2
            rounded-2xl
            bg-emerald-500
            px-5
            py-3
            font-semibold
            text-white
          "
        >
          <Lock className="h-4 w-4" />
          Update Password
        </button>
      </section>

      {/* Save */}

      <section className="flex justify-end">
        <button
          className="
            flex
            items-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            px-8
            py-4
            font-semibold
            text-white
            shadow-lg
          "
        >
          <Save className="h-5 w-5" />
          Save Changes
        </button>
      </section>
    </div>
  );
}