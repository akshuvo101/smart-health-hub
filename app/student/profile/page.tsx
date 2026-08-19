"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import ProfileHeader from "@/components/profile/profile-header";
import AvatarCard from "@/components/profile/avatar-card";
import BioCard from "@/components/profile/bio-card";
import SaveProfileButton from "@/components/profile/save-profile-button";

import { Profile } from "@/types/profile";
import { ApiResponse } from "@/types/api";

import AcademicInformationCard from "@/components/profile/academic-info-card";
import PersonalInformationCard from "@/components/profile/personal-info-card";

export default function StudentProfilePage() {
    const [profile, setProfile] =
        useState<Profile | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        try {
            const response = await fetch(
                "/api/profile"
            );

            const result: ApiResponse<Profile> =
                await response.json();

            if (
                result.success &&
                result.data
            ) {
                setProfile(result.data);
            } else {
                toast.error(
                    result.message ??
                        "Profile not found."
                );
            }
        } catch (error) {
            console.error(error);

            toast.error(
                "Failed to load profile."
            );
        } finally {
            setLoading(false);
        }
    }

    function handleChange(
        field: keyof Profile,
        value: string
    ) {
        if (!profile) return;

        setProfile({
            ...profile,
            [field]: value,
        });
    }

    async function handleSave() {
        if (!profile) return;

        try {
            setSaving(true);

            const response = await fetch(
                "/api/profile",
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify(profile),
                }
            );

            const result: ApiResponse<Profile> =
                await response.json();

            if (!result.success) {
                throw new Error(
                    result.message ??
                        "Unable to save profile."
                );
            }

            if (result.data) {
                setProfile(result.data);
            }

            toast.success(
                "Profile updated successfully."
            );
        } catch (error) {
            console.error(error);

            toast.error(
                "Failed to save profile."
            );
        } finally {
            setSaving(false);
        }
    }

    /* Loading */
    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="text-center">
                    <div
                        className="
                            mx-auto
                            h-9
                            w-9
                            animate-spin
                            rounded-full
                            border-4
                            border-emerald-500
                            border-t-transparent
                        "
                    />

                    <p className="mt-3 text-xs text-slate-500">
                        Loading profile...
                    </p>
                </div>
            </div>
        );
    }

    /* Profile Not Found */
    if (!profile) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="text-center">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        Profile not found
                    </h2>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Unable to load your profile.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header */}

            <ProfileHeader />

            {/* Profile Content */}

            <section
                className="
                    grid
                    gap-4
                    xl:grid-cols-12
                "
            >
                {/* Left Sidebar */}

                <div
                    className="
                        space-y-4
                        xl:col-span-4
                    "
                >
                    <AvatarCard
                        profile={profile}
                        onProfileUpdated={setProfile}
                    />
                </div>

                {/* Right Content */}

                <div
                    className="
                        space-y-4
                        xl:col-span-8
                    "
                >
                    <PersonalInformationCard
                        profile={profile}
                        onChange={handleChange}
                    />

                    <AcademicInformationCard
                        profile={profile}
                        onChange={handleChange}
                    />

                    <BioCard
                        profile={profile}
                        onChange={handleChange}
                    />

                    {/* Save */}

                    <div className="flex justify-end pt-1">
                        <SaveProfileButton
                            loading={saving}
                            onSave={handleSave}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}