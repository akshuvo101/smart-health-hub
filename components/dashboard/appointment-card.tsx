import Card from "@/components/ui/card";

import {
  UserRound,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function AppointmentCard() {
  return (
    <Card className="relative overflow-hidden">
      {/* Background Glow */}

      <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative">
        {/* Header */}

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">
              <UserRound className="h-7 w-7 text-violet-500" />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Professional Support
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                AI recommendation
              </p>
            </div>
          </div>

          <div className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-600">
            Optional
          </div>
        </div>

        {/* Recommendation */}

        <div className="mt-8 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-1 h-5 w-5 text-emerald-500" />

            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">
                You're doing well
              </h4>

              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Based on your latest assessment,
                professional counseling is not
                required at the moment. Continue
                your healthy routine and complete
                regular mental check-ins.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}

        <button
          className="
            mt-6
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-violet-500
            to-fuchsia-500
            py-3
            font-semibold
            text-white
            transition-all
            hover:-translate-y-1
            hover:shadow-lg
          "
        >
          <Sparkles className="h-4 w-4" />

          Chat with AI Counselor

          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
}