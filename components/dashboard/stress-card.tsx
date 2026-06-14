import Card from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function StressCard() {
  return (
    <Card>
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10">
          <Activity className="h-8 w-8 text-orange-500" />
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Stress Level
          </h3>

          <p className="text-2xl font-bold text-orange-500">
            Low
          </p>

          <p className="text-sm text-slate-500">
            Improved from last week
          </p>
        </div>
      </div>
    </Card>
  );
}