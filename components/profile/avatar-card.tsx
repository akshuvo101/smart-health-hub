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
  const inputRef = useRef<HTMLInputElement>(null);

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

      onProfileUpdated?.(result.data);
    } catch (error) {
      console.error(error);

      alert("Failed to upload avatar.");
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

      onProfileUpdated?.(result.data);
    } catch (error) {
      console.error(error);

      alert("Failed to remove avatar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
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
              h-36
              w-36
              overflow-hidden
              rounded-full
              border-4
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
              width={144}
              height={144}
              className="h-full w-full object-cover"
            />
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={() =>
              inputRef.current?.click()
            }
            className="
              absolute
              bottom-1
              right-1
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-emerald-500
              text-white
              shadow-lg
              transition

              hover:bg-emerald-600

              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Camera className="h-5 w-5" />
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

        {/* Remove */}

        {profile.avatar_url && (
          <button
            type="button"
            onClick={removeAvatar}
            disabled={loading}
            className="
              mt-3
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-red-500

              hover:text-red-600
            "
          >
            <Trash2 className="h-4 w-4" />
            Remove Avatar
          </button>
        )}

        {/* Name */}

        <h2 className="mt-5 text-xl font-bold">
          {profile.full_name ||
            "Student Name"}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {profile.email}
        </p>

        {/* Student ID */}

        <div
          className="
            mt-4
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-emerald-100
            px-4
            py-2
            text-sm
            font-semibold
            text-emerald-700

            dark:bg-emerald-500/20
            dark:text-emerald-400
          "
        >
          <CheckCircle2 className="h-4 w-4" />

          {profile.student_id ||
            "Student ID not added"}
        </div>

        {/* University */}

        <p className="mt-3 text-center text-sm text-slate-500">
          {profile.university ||
            "Bangladesh University of Business and Technology (BUBT)"}
        </p>
      </div>

      {/* Progress */}

      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">
            Profile Completion
          </span>

          <span className="text-sm font-bold text-emerald-600">
            {completion}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all"
            style={{
              width: `${completion}%`,
            }}
          />
        </div>

        <p className="mt-3 text-center text-xs text-slate-500">
          Complete your profile to unlock all
          PsycoMentalHub features.
        </p>
      </div>
    </section>
  );
}