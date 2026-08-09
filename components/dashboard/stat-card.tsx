import Card from "@/components/ui/card";

import {
  ArrowUpRight,
  LucideIcon,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: React.ReactNode;
  subtitle?: string;
  icon: LucideIcon;
  color?: string;
  badge?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "from-emerald-500 to-teal-500",
}: StatCardProps) {
  return (
    <Card
      className="
        group
        relative
        overflow-hidden
        transition-all
        duration-300

        hover:-translate-y-2
        hover:shadow-2xl
      "
    >
      {/* Glow */}

      <div
        className={`
          absolute
          -right-10
          -top-10
          h-28
          w-28
          rounded-full
          bg-gradient-to-br
          ${color}
          opacity-10
          blur-3xl
        `}
      />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              {title}
            </p>

            <h3 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">
              {value}
            </h3>

            {subtitle && (
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {subtitle}
              </p>
            )}
          </div>

          <div
            className={`
              flex
              h-16
              w-16
              items-center
              justify-center

              rounded-3xl

              bg-gradient-to-br
              ${color}

              text-white
              shadow-xl

              transition-transform
              duration-300

              group-hover:scale-110
              group-hover:rotate-6
            `}
          >
            <Icon className="h-8 w-8" />
          </div>
        </div>

        {/* Footer */}

        <div className="mt-8 flex items-center justify-between">
          <span
            className="
              rounded-full
              bg-emerald-500/10
              px-3
              py-1
              text-xs
              font-medium
              text-emerald-600
            "
          >
            AI Updated
          </span>

          <div className="flex items-center gap-1 text-sm font-medium text-emerald-600">
            <ArrowUpRight className="h-4 w-4" />

            Live
          </div>
        </div>
      </div>
    </Card>
  );
}