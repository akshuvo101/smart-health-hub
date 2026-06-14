import {
  Settings,
  User,
  Bell,
  Shield,
  Brain,
  Lock,
  Moon,
  Globe,
  Save,
  KeyRound,
} from "lucide-react";

export default function CounselorSettingsPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 p-8 text-white shadow-2xl">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

        <div className="relative z-10">
          <span className="rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur-md">
            Account Management
          </span>

          <h1 className="mt-5 text-4xl font-bold lg:text-5xl">
            Counselor Settings
          </h1>

          <p className="mt-4 max-w-2xl text-white/90">
            Manage your profile, security preferences,
            notifications, AI settings, and platform
            customization.
          </p>
        </div>
      </section>

      {/* Profile Settings */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-3">
          <User className="h-6 w-6 text-violet-500" />

          <h2 className="text-xl font-semibold">
            Profile Information
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <input
              type="text"
              defaultValue="Dr. Sarah Johnson"
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                px-4
                py-3
                dark:border-slate-800
                dark:bg-slate-950
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <input
              type="email"
              defaultValue="counselor@healthhub.com"
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                px-4
                py-3
                dark:border-slate-800
                dark:bg-slate-950
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Department
            </label>

            <input
              type="text"
              defaultValue="Student Wellness Center"
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                px-4
                py-3
                dark:border-slate-800
                dark:bg-slate-950
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Phone Number
            </label>

            <input
              type="text"
              defaultValue="+1 555-123-4567"
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                px-4
                py-3
                dark:border-slate-800
                dark:bg-slate-950
              "
            />
          </div>
        </div>
      </section>

      {/* Notifications */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-3">
          <Bell className="h-6 w-6 text-cyan-500" />

          <h2 className="text-xl font-semibold">
            Notification Preferences
          </h2>
        </div>

        <div className="space-y-5">
          {[
            "New Appointment Requests",
            "Student Messages",
            "AI Risk Alerts",
            "Assessment Submissions",
            "System Announcements",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between"
            >
              <span>{item}</span>

              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="peer sr-only"
                />

                <div
                  className="
                    peer
                    h-6
                    w-11
                    rounded-full
                    bg-slate-300
                    after:absolute
                    after:left-[2px]
                    after:top-[2px]
                    after:h-5
                    after:w-5
                    after:rounded-full
                    after:bg-white
                    after:transition-all
                    peer-checked:bg-violet-500
                    peer-checked:after:translate-x-full
                  "
                />
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* AI Settings */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-3">
          <Brain className="h-6 w-6 text-pink-500" />

          <h2 className="text-xl font-semibold">
            AI Assistant Preferences
          </h2>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <div className="flex items-center justify-between">
              <span>
                Enable AI Student Risk Analysis
              </span>

              <input type="checkbox" defaultChecked />
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <div className="flex items-center justify-between">
              <span>
                Generate Session Summaries
              </span>

              <input type="checkbox" defaultChecked />
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <div className="flex items-center justify-between">
              <span>
                AI Wellness Recommendations
              </span>

              <input type="checkbox" defaultChecked />
            </div>
          </div>
        </div>
      </section>

      {/* Security */}

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex items-center gap-3">
            <Shield className="h-6 w-6 text-emerald-500" />

            <h2 className="text-xl font-semibold">
              Security
            </h2>
          </div>

          <div className="space-y-4">
            <button className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800">
              <Lock className="h-5 w-5" />
              Change Password
            </button>

            <button className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800">
              <KeyRound className="h-5 w-5" />
              Two-Factor Authentication
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex items-center gap-3">
            <Settings className="h-6 w-6 text-orange-500" />

            <h2 className="text-xl font-semibold">
              Preferences
            </h2>
          </div>

          <div className="space-y-4">
            <button className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800">
              <Moon className="h-5 w-5" />
              Appearance Settings
            </button>

            <button className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800">
              <Globe className="h-5 w-5" />
              Language & Region
            </button>
          </div>
        </div>
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
            from-violet-500
            to-pink-500
            px-8
            py-4
            font-semibold
            text-white
            shadow-lg
            transition-all
            hover:-translate-y-1
          "
        >
          <Save className="h-5 w-5" />
          Save Changes
        </button>
      </section>
    </div>
  );
}