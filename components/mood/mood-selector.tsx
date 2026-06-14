"use client";

import { useState } from "react";
import {
  Smile,
  Laugh,
  Meh,
  Frown,
  Angry,
} from "lucide-react";

import Card from "@/components/ui/card";

const moods = [
  {
    label: "Happy",
    icon: Smile,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    label: "Excited",
    icon: Laugh,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Neutral",
    icon: Meh,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    label: "Sad",
    icon: Frown,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    label: "Stressed",
    icon: Angry,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
];

export default function MoodSelector() {
  const [selectedMood, setSelectedMood] =
    useState("Happy");

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {moods.map((mood) => {
        const Icon = mood.icon;
        const active =
          selectedMood === mood.label;

        return (
          <Card
            key={mood.label}
            onClick={() =>
              setSelectedMood(mood.label)
            }
            className={`
              cursor-pointer
              text-center
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-xl
              ${
                active
                  ? "border-emerald-500 ring-2 ring-emerald-500/20"
                  : ""
              }
            `}
          >
            <div
              className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${mood.bg}`}
            >
              <Icon
                className={`h-8 w-8 ${mood.color}`}
              />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
              {mood.label}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Select mood
            </p>
          </Card>
        );
      })}
    </div>
  );
}