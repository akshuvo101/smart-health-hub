"use client";

import { useState } from "react";
import {
    Bell,
    CalendarDays,
    ClipboardCheck,
    MessageCircle,
} from "lucide-react";

const notificationSettings = [
    {
        id: "wellness",
        title: "Daily Wellness Reminder",
        description: "Gentle daily check-in reminders.",
        icon: Bell,
    },
    {
        id: "appointments",
        title: "Appointment Notifications",
        description: "Updates about your appointments.",
        icon: CalendarDays,
    },
    {
        id: "assessments",
        title: "Assessment Reminders",
        description: "Reminders for pending assessments.",
        icon: ClipboardCheck,
    },
    {
        id: "forum",
        title: "Forum Activity Updates",
        description: "Updates about your forum activity.",
        icon: MessageCircle,
    },
];

export default function NotificationSettings() {
    const [settings, setSettings] = useState({
        wellness: true,
        appointments: true,
        assessments: true,
        forum: false,
    });

    function toggleSetting(id: keyof typeof settings) {
        setSettings((previous) => ({
            ...previous,
            [id]: !previous[id],
        }));
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                        Notifications
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        Choose which updates you want to receive.
                    </p>
                </div>

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <Bell className="h-4 w-4" />
                </div>
            </div>

            {/* Notification Options */}
            <div className="space-y-2.5">
                {notificationSettings.map((item) => {
                    const Icon = item.icon;
                    const enabled =
                        settings[item.id as keyof typeof settings];

                    return (
                        <div
                            key={item.id}
                            className={`flex items-center justify-between gap-3 rounded-xl border p-3 transition-colors ${
                                enabled
                                    ? "border-emerald-500/20 bg-emerald-500/[0.04]"
                                    : "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40"
                            }`}
                        >
                            {/* Information */}
                            <div className="flex min-w-0 items-center gap-2.5">
                                <div
                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                                        enabled
                                            ? "bg-emerald-500/10 text-emerald-500"
                                            : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                                    }`}
                                >
                                    <Icon className="h-3.5 w-3.5" />
                                </div>

                                <div className="min-w-0">
                                    <p className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200">
                                        {item.title}
                                    </p>

                                    <p className="mt-0.5 truncate text-[10px] text-slate-500 dark:text-slate-400">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* Modern Toggle */}
                            <button
                                type="button"
                                role="switch"
                                aria-checked={enabled}
                                aria-label={`Toggle ${item.title}`}
                                onClick={() =>
                                    toggleSetting(
                                        item.id as keyof typeof settings
                                    )
                                }
                                className={`relative h-[22px] w-10 shrink-0 rounded-full p-0.5 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500/30 ${
                                    enabled
                                        ? "bg-emerald-500"
                                        : "bg-slate-300 dark:bg-slate-600"
                                }`}
                            >
                                <span
                                    className={`absolute left-0.5 top-0.5 h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
                                        enabled
                                            ? "translate-x-[18px]"
                                            : "translate-x-0"
                                    }`}
                                />
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Footer Note */}
            <div className="mt-3 rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/50">
                <p className="text-[10px] leading-relaxed text-slate-500 dark:text-slate-400">
                    You can change these preferences anytime.
                </p>
            </div>
        </div>
    );
}