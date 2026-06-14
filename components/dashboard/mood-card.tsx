import Card from "@/components/ui/card";
import { Smile } from "lucide-react";

export default function MoodCard() {
  return (
    <Card>
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10">
          <Smile className="h-8 w-8 text-green-500" />
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Today's Mood
          </h3>

          <p className="text-2xl font-bold text-green-500">
            Happy 😊
          </p>

          <p className="text-sm text-slate-500">
            Consistent positive mood this week
          </p>
        </div>
      </div>
    </Card>
  );
}