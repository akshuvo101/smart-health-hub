"use client";

import Card from "@/components/ui/card";

import {
  ResponsiveContainer,
  AreaChart,
 Area,
 CartesianGrid,
 XAxis,
 YAxis,
 Tooltip,
} from "recharts";

import {
  Brain,
  BadgeCheck,
  TrendingUp,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

/* ==========================================
Dummy Data
========================================== */

const data = [
  { day: "Mon", score: 64 },
  { day: "Tue", score: 70 },
  { day: "Wed", score: 66 },
  { day: "Thu", score: 79 },
  { day: "Fri", score: 84 },
  { day: "Sat", score: 88 },
  { day: "Sun", score: 91 },
];

export default function MentalStateCard() {
  return (
    <Card className="relative overflow-hidden">

      {/* Background Glow */}

      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
              <Brain className="h-7 w-7 text-emerald-500" />
            </div>

            <div>

              <h3 className="font-semibold text-slate-900 dark:text-white">
                AI Mental State
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Based on today's assessment
              </p>

            </div>

          </div>

          <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600">
            ● Live AI
          </div>

        </div>

        {/* Main Result */}

        <div className="mt-8 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <span className="text-6xl">
              😌
            </span>

            <div>

              <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
                Calm
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                High Confidence
              </p>

            </div>

          </div>

          <div className="text-right">

            <p className="text-5xl font-black text-emerald-500">
              91%
            </p>

            <p className="text-xs text-slate-500">
              AI Confidence
            </p>

          </div>

        </div>

        {/* Small Cards */}

        <div className="mt-8 grid grid-cols-3 gap-4">

          <div className="rounded-2xl bg-slate-50 p-4 text-center dark:bg-slate-800">

            <TrendingUp className="mx-auto h-5 w-5 text-emerald-500" />

            <p className="mt-2 font-bold text-emerald-500">
              +8%
            </p>

            <p className="text-xs text-slate-500">
              This Week
            </p>

          </div>

          <div className="rounded-2xl bg-slate-50 p-4 text-center dark:bg-slate-800">

            <BadgeCheck className="mx-auto h-5 w-5 text-blue-500" />

            <p className="mt-2 font-bold">
              Stable
            </p>

            <p className="text-xs text-slate-500">
              Mental State
            </p>

          </div>

          <div className="rounded-2xl bg-slate-50 p-4 text-center dark:bg-slate-800">

            <ShieldCheck className="mx-auto h-5 w-5 text-emerald-500" />

            <p className="mt-2 font-bold">
              Low
            </p>

            <p className="text-xs text-slate-500">
              Risk Level
            </p>

          </div>

        </div>

        {/* Chart */}

        <div className="mt-8">

          <div className="mb-3 flex items-center gap-2">

            <Sparkles className="h-4 w-4 text-emerald-500" />

            <p className="text-sm font-medium">
              7 Days Trend
            </p>

          </div>

          <div className="h-56">

            <ResponsiveContainer width="100%" height="100%">

              <AreaChart data={data}>

                <defs>

                  <linearGradient
                    id="mental"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#10b981"
                      stopOpacity={0.45}
                    />

                    <stop
                      offset="100%"
                      stopColor="#10b981"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>

                <CartesianGrid
                  strokeDasharray="4 4"
                  opacity={0.15}
                />

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  domain={[40,100]}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#mental)"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-6 border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-slate-800">
          Last updated • Today 8:35 PM
        </div>

      </div>

    </Card>
  );
}