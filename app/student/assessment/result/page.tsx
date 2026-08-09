"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  RotateCcw,
  Download,
  Home,
} from "lucide-react";

import RecommendationCard from "@/components/assessment/result/recommendation-card";
import AIAnalysisCard from "@/components/assessment/ai-analysis-card";
import MentalScoreCard from "@/components/assessment/mental-score-card";

import {
  Assessment,
} from "@/types/assessment";
import { ApiResponse } from "@/types/api";
import DownloadReportButton from "@/components/report/download-report-button";


export default function AssessmentResultPage() {
  const [assessment, setAssessment] =
    useState<Assessment | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchAssessment =
      async () => {
        try {
          const response =
            await fetch(
              "/api/assessment/latest"
            );

          const result: ApiResponse<Assessment> =
            await response.json();

          if (
            result.success &&
            result.data
          ) {
            setAssessment(result.data);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchAssessment();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading assessment...
        </p>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-sm text-red-500">
          No assessment found.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 px-4">
      {/* Title */}

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-500">
          Mental Assessment
        </p>

        <h1 className="mt-1 text-xl font-bold md:text-2xl">
          Your Result
        </h1>

        <p className="mt-1 text-xs text-slate-500">
          AI analyzed your latest assessment.
        </p>
      </div>

      {/* Score + Analysis */}

      <section className="grid gap-4 xl:grid-cols-12">
        <div className="xl:col-span-4">
          <MentalScoreCard
            score={assessment.score}
            mentalState={
              assessment.mental_state
            }
            confidence={
              assessment.confidence
            }
            weeklyChange={0}
          />
        </div>

        <div className="xl:col-span-8">
          <AIAnalysisCard
            assessment={assessment}
          />
        </div>
      </section>

      {/* Recommendation */}

      <section className="grid gap-4 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <RecommendationCard
            assessment={assessment}
          />
        </div>

        {/* Actions */}

        {/* Actions */}

        <div className="xl:col-span-5">
          <div
            className="
      sticky
      top-6
      flex
      h-full
      min-h-[360px]
      flex-col
      rounded-2xl
      border
      border-slate-200/70
      bg-white/90
      p-4
      shadow-sm
      backdrop-blur-xl

      dark:border-slate-800
      dark:bg-slate-900/70
    "
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-500">
                NEXT STEP
              </p>

              <h2 className="mt-1.5 text-lg font-bold">
                Continue Your Journey
              </h2>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Keep tracking your mental wellbeing
                and let AI help you improve every
                week.
              </p>
            </div>

            <div className="mt-auto space-y-2 pt-4">
              <Link
                href="/student/assessment/questions"
                className="
          flex
          items-center
          justify-center
          gap-2
          rounded-lg
          border
          border-slate-200
          py-2.5
          text-xs
          font-semibold
          transition-all

          hover:border-emerald-400
          hover:shadow-md

          dark:border-slate-700
        "
              >
                <RotateCcw className="h-4 w-4" />
                Retake Assessment
              </Link>

              <DownloadReportButton
                assessment={assessment}
              />

              <Link
                href="/student/dashboard"
                className="
          flex
          items-center
          justify-center
          gap-2
          rounded-lg
          bg-gradient-to-r
          from-emerald-500
          to-cyan-500
          py-2.5
          text-xs
          font-semibold
          text-white
          transition-all

          hover:shadow-lg
        "
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}