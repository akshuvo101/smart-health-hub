"use client";

import { useState } from "react";
import {
    KeyRound,
    ShieldCheck,
    LogOut,
    Trash2,
    LockKeyhole,
} from "lucide-react";

export default function AccountSettings() {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    function handleChangePassword() {
        // Password change flow can be connected later.
        console.log("Change password");
    }

    function handleSignOut() {
        // Connect with your Supabase sign-out flow later.
        console.log("Sign out");
    }

    function handleDeleteAccount() {
        // Account deletion flow will be connected later.
        console.log("Delete account");
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                        Account & Security
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        Manage your account security and access.
                    </p>
                </div>

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <LockKeyhole className="h-4 w-4" />
                </div>
            </div>

            {/* Security Options */}
            <div className="space-y-2.5">
                {/* Change Password */}
                <button
                    type="button"
                    onClick={handleChangePassword}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-3 text-left transition-colors hover:border-emerald-500/30 hover:bg-emerald-500/[0.03] dark:border-slate-800 dark:hover:bg-emerald-500/[0.04]"
                >
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            <KeyRound className="h-3.5 w-3.5" />
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                Change Password
                            </p>

                            <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                                Update your account password.
                            </p>
                        </div>
                    </div>

                    <span className="text-xs text-slate-400">
                        →
                    </span>
                </button>

                {/* Two Factor */}
                <div
                    className={`flex items-center justify-between gap-3 rounded-xl border p-3 transition-colors ${
                        twoFactorEnabled
                            ? "border-emerald-500/20 bg-emerald-500/[0.04]"
                            : "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40"
                    }`}
                >
                    <div className="flex min-w-0 items-center gap-2.5">
                        <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                                twoFactorEnabled
                                    ? "bg-emerald-500/10 text-emerald-500"
                                    : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                            }`}
                        >
                            <ShieldCheck className="h-3.5 w-3.5" />
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                Two-Factor Authentication
                            </p>

                            <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                                Add an extra layer of account security.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        role="switch"
                        aria-checked={twoFactorEnabled}
                        aria-label="Toggle two-factor authentication"
                        onClick={() =>
                            setTwoFactorEnabled((previous) => !previous)
                        }
                        className={`relative h-[22px] w-10 shrink-0 rounded-full p-0.5 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500/30 ${
                            twoFactorEnabled
                                ? "bg-emerald-500"
                                : "bg-slate-300 dark:bg-slate-600"
                        }`}
                    >
                        <span
                            className={`absolute left-0.5 top-0.5 h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
                                twoFactorEnabled
                                    ? "translate-x-[18px]"
                                    : "translate-x-0"
                            }`}
                        />
                    </button>
                </div>

                {/* Sign Out */}
                <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2.5 rounded-xl border border-slate-200 p-3 text-left transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        <LogOut className="h-3.5 w-3.5" />
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                            Sign Out
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                            Sign out from this account.
                        </p>
                    </div>
                </button>

                {/* Delete Account */}
                {!showDeleteConfirm ? (
                    <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(true)}
                        className="flex w-full items-center gap-2.5 rounded-xl border border-red-200 bg-red-50/50 p-3 text-left transition-colors hover:bg-red-50 dark:border-red-900/40 dark:bg-red-500/[0.04] dark:hover:bg-red-500/[0.08]"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-500/10 dark:text-red-400">
                            <Trash2 className="h-3.5 w-3.5" />
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-red-600 dark:text-red-400">
                                Delete Account
                            </p>

                            <p className="mt-0.5 text-[10px] text-red-500/70 dark:text-red-400/70">
                                Permanently remove your account.
                            </p>
                        </div>
                    </button>
                ) : (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-3 dark:border-red-900/40 dark:bg-red-500/[0.06]">
                        <div className="flex items-start gap-2.5">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-500/10 dark:text-red-400">
                                <Trash2 className="h-3.5 w-3.5" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-red-700 dark:text-red-400">
                                    Delete your account?
                                </p>

                                <p className="mt-1 text-[10px] leading-relaxed text-red-600/80 dark:text-red-400/70">
                                    This action is permanent and cannot be undone.
                                </p>
                            </div>
                        </div>

                        <div className="mt-3 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() =>
                                    setShowDeleteConfirm(false)
                                }
                                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleDeleteAccount}
                                className="rounded-lg bg-red-500 px-3 py-1.5 text-[10px] font-semibold text-white transition hover:bg-red-600"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}