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
        gap-2
        rounded-xl
        bg-gradient-to-r
        from-emerald-500
        to-cyan-500
        px-6
        py-3
        text-sm
        font-semibold
        text-white
        shadow-lg
        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:shadow-xl

        disabled:cursor-not-allowed
        disabled:opacity-70
      "
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          Save Profile
        </>
      )}
    </button>
  );
}