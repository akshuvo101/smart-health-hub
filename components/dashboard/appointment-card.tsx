import Card from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

export default function AppointmentCard() {
  return (
    <Card>
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10">
          <CalendarDays className="h-8 w-8 text-purple-500" />
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Next Appointment
          </h3>

          <p className="text-lg font-bold text-purple-500">
            June 10, 2026
          </p>

          <p className="text-sm text-slate-500">
            Counselor Session - 2:00 PM
          </p>
        </div>
      </div>
    </Card>
  );
}