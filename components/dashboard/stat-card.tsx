import Card from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  color?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "from-emerald-500 to-teal-500",
}: StatCardProps) {
  return (
    <Card className="group hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {value}
          </h3>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-500">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`
            flex h-14 w-14 items-center justify-center
            rounded-2xl bg-gradient-to-br ${color}
            text-white shadow-lg
          `}
        >
          <Icon className="h-7 w-7" />
        </div>
      </div>
    </Card>
  );
}