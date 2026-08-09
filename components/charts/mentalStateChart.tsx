"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  {
    day: "Mon",
    score: 64,
  },
  {
    day: "Tue",
    score: 70,
  },
  {
    day: "Wed",
    score: 62,
  },
  {
    day: "Thu",
    score: 78,
  },
  {
    day: "Fri",
    score: 84,
  },
  {
    day: "Sat",
    score: 88,
  },
  {
    day: "Sun",
    score: 91,
  },
];

export default function MentalStateChart() {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient
              id="mentalGradient"
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
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            domain={[40, 100]}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            cursor={{
              stroke: "#10b981",
              strokeWidth: 1,
            }}
            contentStyle={{
              borderRadius: 16,
              border: "none",
            }}
          />

          <Area
            type="monotone"
            dataKey="score"
            stroke="#10b981"
            strokeWidth={3}
            fill="url(#mentalGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}