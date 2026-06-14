import ProfileSettings from "@/components/settings/profile-settings";
import NotificationSettings from "@/components/settings/notification-settings";
import PrivacySettings from "@/components/settings/privacy-settings";
import AccountSettings from "@/components/settings/account-settings";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="mt-3 max-w-2xl text-slate-300">
          Manage your profile, privacy preferences,
          notifications, and account security.
        </p>
      </section>

      {/* Settings Grid */}

      <section className="grid gap-6 xl:grid-cols-2">
        <ProfileSettings />

        <NotificationSettings />

        <PrivacySettings />

        <AccountSettings />
      </section>
    </div>
  );
}