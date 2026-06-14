import Card from "@/components/ui/card";
import { Moon } from "lucide-react";

export default function SleepCard() {
  return (
    <Card>
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
          <Moon className="h-8 w-8 text-blue-500" />
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Last Night Sleep
          </h3>

          <p className="text-2xl font-bold text-blue-500">
            7.8 hrs
          </p>

          <p className="text-sm text-slate-500">
            Above recommended average
          </p>
        </div>
      </div>
    </Card>
  );
}