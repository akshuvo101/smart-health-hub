"use client";

import { Loader2, Save } from "lucide-react";

interface SaveProfileButtonProps {
  loading: boolean;
  onSave: () => void;
}

export default function SaveProfileButton({
  loading,
  onSave,
}: SaveProfileButtonProps) {
  return (
    <button
      type="button"
      onClick={onSave}
      disabled={loading}
      className="
        inline-flex
        items-center
        justify-center
        gap-1.5
        rounded-lg
        bg-gradient-to-r
        from-emerald-500
        to-cyan-500
        px-4
        py-2
        text-xs
        font-semibold
        text-white
        shadow-sm
        transition-all
        duration-200

        hover:-translate-y-0.5
        hover:shadow-md

        disabled:cursor-not-allowed
        disabled:opacity-70
      "
    >
      {loading ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Save className="h-3.5 w-3.5" />
          Save Profile
        </>
      )}
    </button>
  );
}