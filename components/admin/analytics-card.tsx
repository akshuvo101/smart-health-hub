import { LucideIcon, TrendingUp } from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  value: string;
  growth: string;
  icon: LucideIcon;
  color?: string;
}

export default function AnalyticsCard({
  title,
  value,
  growth,
  icon: Icon,
  color = "from-emerald-500 to-teal-500",
}: AnalyticsCardProps) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg`}
        >
          <Icon className="h-7 w-7" />
        </div>

        <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-600 dark:bg-emerald-500/10">
          <TrendingUp className="h-4 w-4" />
          {growth}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-slate-500">
          {title}
        </p>

        <h3 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
          {value}
        </h3>
      </div>
    </div>
  );
}