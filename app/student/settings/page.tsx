import ProfileSettings from "@/components/settings/profile-settings";
import NotificationSettings from "@/components/settings/notification-settings";
import PrivacySettings from "@/components/settings/privacy-settings";
import AccountSettings from "@/components/settings/account-settings";

export default function SettingsPage() {
    return (
        <div className="space-y-5">
            {/* Hero */}
            <section className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 px-5 py-5 text-white shadow-lg">
                <div className="max-w-2xl">
                    <h1 className="text-xl font-bold tracking-tight">
                        Settings
                    </h1>

                    <p className="mt-1 text-xs leading-relaxed text-slate-300">
                        Manage your profile, privacy, notifications,
                        and account security.
                    </p>
                </div>
            </section>

            {/* Settings Grid */}
            <section className="grid items-start gap-4 xl:grid-cols-2">
                <ProfileSettings />

                <NotificationSettings />

                <PrivacySettings />

                <AccountSettings />
            </section>
        </div>
    );
}