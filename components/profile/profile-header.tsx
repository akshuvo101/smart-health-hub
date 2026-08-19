"use client";

import { UserCircle2 } from "lucide-react";

export default function ProfileHeader() {
    return (
        <section
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                py-3.5
                shadow-sm

                dark:border-slate-800
                dark:bg-slate-900
            "
        >
            <div className="flex items-center gap-3">
                {/* Icon */}
                <div
                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-gradient-to-br
                        from-emerald-500
                        to-cyan-500
                        text-white
                    "
                >
                    <UserCircle2 className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="min-w-0">
                    <p
                        className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.16em]
                            text-cyan-500
                        "
                    >
                        Student Profile
                    </p>

                    <h1 className="mt-0.5 text-lg font-bold leading-tight text-slate-900 dark:text-white">
                        My Profile
                    </h1>

                    <p className="mt-0.5 text-xs leading-4 text-slate-500 dark:text-slate-400">
                        Manage your personal, academic and university information.
                    </p>
                </div>
            </div>
        </section>
    );
}