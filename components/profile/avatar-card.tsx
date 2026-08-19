"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import {
    Camera,
    CheckCircle2,
    Loader2,
    Trash2,
} from "lucide-react";

import { Profile } from "@/types/profile";

interface AvatarCardProps {
    profile: Profile;
    onProfileUpdated?: (profile: Profile) => void;
}

export default function AvatarCard({
    profile,
    onProfileUpdated,
}: AvatarCardProps) {
    const inputRef =
        useRef<HTMLInputElement>(null);

    const [loading, setLoading] =
        useState(false);

    const completion =
        [
            profile.full_name,
            profile.email,
            profile.student_id,
            profile.department,
            profile.semester,
            profile.phone,
            profile.gender,
            profile.date_of_birth,
            profile.bio,
            profile.university,
        ].filter(Boolean).length * 10;

    const uploadAvatar = async (
        file: File
    ) => {
        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("file", file);

            const response = await fetch(
                "/api/profile/avatar",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const result =
                await response.json();

            if (!result.success) {
                alert(
                    result.message ||
                        "Upload failed."
                );

                return;
            }

            onProfileUpdated?.(
                result.data
            );
        } catch (error) {
            console.error(error);

            alert(
                "Failed to upload avatar."
            );
        } finally {
            setLoading(false);
        }
    };

    const removeAvatar = async () => {
        if (
            !confirm(
                "Remove your profile picture?"
            )
        ) {
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "/api/profile/avatar",
                {
                    method: "DELETE",
                }
            );

            const result =
                await response.json();

            if (!result.success) {
                alert(
                    result.message ||
                        "Failed to remove avatar."
                );

                return;
            }

            onProfileUpdated?.(
                result.data
            );
        } catch (error) {
            console.error(error);

            alert(
                "Failed to remove avatar."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-sm

                dark:border-slate-800
                dark:bg-slate-900
            "
        >
            <div className="flex flex-col items-center">
                {/* Avatar */}

                <div className="relative">
                    <div
                        className="
                            h-26
                            w-26
                            overflow-hidden
                            rounded-full
                            border-3
                            border-emerald-500
                            bg-slate-100

                            dark:bg-slate-800
                        "
                    >
                        <Image
                            src={
                                profile.avatar_url ||
                                "/images/default-avatar.png"
                            }
                            alt="Profile"
                            width={104}
                            height={104}
                            className="
                                h-full
                                w-full
                                object-cover
                            "
                        />
                    </div>

                    {/* Upload */}

                    <button
                        type="button"
                        disabled={loading}
                        onClick={() =>
                            inputRef.current?.click()
                        }
                        className="
                            absolute
                            bottom-0
                            right-0
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            bg-emerald-500
                            text-white
                            shadow-md
                            transition
                            hover:bg-emerald-600
                            disabled:cursor-not-allowed
                            disabled:opacity-70
                        "
                    >
                        {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Camera className="h-4 w-4" />
                        )}
                    </button>

                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={(e) => {
                            const file =
                                e.target.files?.[0];

                            if (file) {
                                uploadAvatar(file);
                            }
                        }}
                    />
                </div>

                {/* Remove Avatar */}

                {profile.avatar_url && (
                    <button
                        type="button"
                        onClick={removeAvatar}
                        disabled={loading}
                        className="
                            mt-2
                            inline-flex
                            items-center
                            gap-1.5
                            text-xs
                            font-medium
                            text-red-500
                            transition
                            hover:text-red-600
                            disabled:opacity-50
                        "
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                        Remove Avatar
                    </button>
                )}

                {/* Name */}

                <h2 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                    {profile.full_name ||
                        "Student Name"}
                </h2>

                {/* Email */}

                <p className="mt-0.5 max-w-full truncate text-xs text-slate-500 dark:text-slate-400">
                    {profile.email}
                </p>

                {/* Student ID */}

                <div
                    className="
                        mt-3
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        bg-emerald-100
                        px-3
                        py-1.5
                        text-xs
                        font-semibold
                        text-emerald-700

                        dark:bg-emerald-500/20
                        dark:text-emerald-400
                    "
                >
                    <CheckCircle2 className="h-3.5 w-3.5" />

                    {profile.student_id ||
                        "Student ID not added"}
                </div>

                {/* University */}

                <p
                    className="
                        mt-2
                        max-w-xs
                        text-center
                        text-xs
                        leading-4
                        text-slate-500
                        dark:text-slate-400
                    "
                >
                    {profile.university ||
                        "Bangladesh University of Business and Technology (BUBT)"}
                </p>
            </div>

            {/* Profile Completion */}

            <div className="mt-5">
                <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        Profile Completion
                    </span>

                    <span className="text-xs font-bold text-emerald-600">
                        {completion}%
                    </span>
                </div>

                <div
                    className="
                        h-2
                        overflow-hidden
                        rounded-full
                        bg-slate-200
                        dark:bg-slate-700
                    "
                >
                    <div
                        className="
                            h-full
                            rounded-full
                            bg-gradient-to-r
                            from-emerald-500
                            to-cyan-500
                            transition-all
                        "
                        style={{
                            width: `${completion}%`,
                        }}
                    />
                </div>

                <p
                    className="
                        mt-2
                        text-center
                        text-[11px]
                        leading-4
                        text-slate-500
                        dark:text-slate-400
                    "
                >
                    Complete your profile to unlock all
                    PsycoMentalHub features.
                </p>
            </div>
        </section>
    );
}