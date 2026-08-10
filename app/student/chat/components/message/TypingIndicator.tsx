"use client";

import { BrainCircuit } from "lucide-react";

export default function TypingIndicator() {

  return (
    <div className="flex w-full justify-start">
      <div className="flex max-w-3xl items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-emerald-500
            via-cyan-500
            to-blue-500
            text-white
            shadow-lg
            animate-pulse
          "
        >
          <BrainCircuit className="h-5 w-5" />
        </div>

        <div
          className="
            inline-flex
            items-center
            gap-3
            rounded-3xl
            border
            border-slate-200/70
            bg-white/90
            px-4
            py-3
            shadow-md
            backdrop-blur-xl

            dark:border-slate-800
            dark:bg-slate-900/80
          "
        >
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400 opacity-70 animate-pulse" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400 opacity-70 animate-pulse" style={{ animationDelay: "0.15s" }} />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400 opacity-70 animate-pulse" style={{ animationDelay: "0.3s" }} />
        </div>
      </div>
    </div>
  );
}