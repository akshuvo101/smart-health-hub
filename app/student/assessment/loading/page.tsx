"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  Clock3,
  CheckCircle2,
} from "lucide-react";

import ParticleBackground from "@/components/assessment/loading/particle-background";
import LoadingBrain from "@/components/assessment/loading/Loading-brain";

type AnalysisErrorType =
  | "quota"
  | "missing-id"
  | "general"
  | null;

export default function AssessmentLoadingPage() {
  const router = useRouter();

  const [progress, setProgress] = useState(0);

  const [error, setError] = useState("");

  const [errorType, setErrorType] =
    useState<AnalysisErrorType>(null);

  const [retryAfter, setRetryAfter] =
    useState(0);

  const [isAnalyzing, setIsAnalyzing] =
    useState(true);

  const [isRetrying, setIsRetrying] =
    useState(false);

  /**
   * Run AI analysis
   */
  const startAnalysis = useCallback(
    async () => {
      try {
        setIsAnalyzing(true);

        setError("");
        setErrorType(null);

        /**
         * Get assessment ID
         */
        const assessmentId =
          sessionStorage.getItem(
            "assessmentId"
          );

        if (!assessmentId) {
          setIsAnalyzing(false);

          setError(
            "We couldn't find your assessment. Please start the assessment again."
          );

          setErrorType("missing-id");

          return;
        }

        /**
         * Call AI analysis API
         */
        const response = await fetch(
          "/api/assessment/analyze",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              assessmentId,
            }),
          }
        );

        const result =
          await response.json();

        /**
         * Handle quota error
         */
        if (response.status === 429) {
          const retryHeader =
            response.headers.get(
              "Retry-After"
            );

          const retrySeconds =
            retryHeader
              ? Math.max(
                  1,
                  Number(retryHeader)
                )
              : 60;

          setRetryAfter(retrySeconds);

          setError(
            "AI analysis is temporarily unavailable."
          );

          setErrorType("quota");

          setIsAnalyzing(false);

          return;
        }

        /**
         * Handle other API errors
         */
        if (
          !response.ok ||
          !result.success
        ) {
          throw new Error(
            result.message ??
              "Failed to analyze assessment."
          );
        }

        /**
         * SUCCESS
         */
        setError("");
        setErrorType(null);

        setProgress(100);

        setIsAnalyzing(false);

        /**
         * Small delay so user can
         * see "Analysis Complete"
         */
        setTimeout(() => {
          sessionStorage.removeItem(
            "assessmentId"
          );

          router.push(
            "/student/assessment/result"
          );
        }, 900);
      } catch (error) {
        console.error(
          "Assessment analysis error:",
          error
        );

        setIsAnalyzing(false);

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong while analyzing your assessment."
        );

        setErrorType("general");
      }
    },
    [router]
  );

  /**
   * Start analysis on page load
   */
  useEffect(() => {
    startAnalysis();
  }, [startAnalysis]);

  /**
   * Visual progress
   *
   * This is only UI feedback.
   * Real completion comes from API.
   */
  useEffect(() => {
    if (!isAnalyzing) {
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          return 90;
        }

        return prev + 1;
      });
    }, 45);

    return () => {
      clearInterval(interval);
    };
  }, [isAnalyzing]);

  /**
   * Retry countdown
   */
  useEffect(() => {
    if (retryAfter <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setRetryAfter((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [retryAfter]);

  /**
   * Retry analysis
   */
  const handleRetry = async () => {
    if (
      retryAfter > 0 ||
      isRetrying
    ) {
      return;
    }

    setIsRetrying(true);

    /**
     * Reset visual progress
     */
    setProgress(0);

    await startAnalysis();

    setIsRetrying(false);
  };

  /**
   * Go back to assessment
   */
  const handleBack = () => {
    sessionStorage.removeItem(
      "assessmentId"
    );

    router.push(
      "/student/assessment/questions"
    );
  };

  /**
   * Status text
   */
  const getStatus = () => {
    if (errorType === "quota") {
      return "AI Temporarily Unavailable";
    }

    if (error) {
      return "Analysis Failed";
    }

    if (progress < 25) {
      return "Initializing AI...";
    }

    if (progress < 50) {
      return "Analyzing Neural Patterns...";
    }

    if (progress < 75) {
      return "Building Wellness Report...";
    }

    if (progress < 100) {
      return "Generating Personalized Insights...";
    }

    return "Analysis Complete";
  };

  /**
   * Loading state
   */
  const showLoading =
    isAnalyzing && !error;

  /**
   * Success state
   */
  const showSuccess =
    progress === 100 &&
    !error &&
    !isAnalyzing;

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background */}

      <ParticleBackground />

      {/* Content */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="flex w-full max-w-lg flex-col items-center text-center">
          {/* Loading Brain */}

          {showLoading && (
            <LoadingBrain
              progress={progress}
            />
          )}

          {/* Success Icon */}

          {showSuccess && (
            <div
              className="
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-3xl
                border
                border-emerald-400/20
                bg-emerald-500/10
                shadow-2xl
                shadow-emerald-500/10
              "
            >
              <CheckCircle2
                className="
                  h-12
                  w-12
                  text-emerald-400
                "
              />
            </div>
          )}

          {/* Error Icon */}

          {error && (
            <div
              className="
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-3xl
                border
                border-red-400/20
                bg-red-500/10
                shadow-2xl
                shadow-red-500/10
              "
            >
              {errorType ===
              "quota" ? (
                <Clock3
                  className="
                    h-11
                    w-11
                    text-amber-400
                  "
                />
              ) : (
                <AlertTriangle
                  className="
                    h-11
                    w-11
                    text-red-400
                  "
                />
              )}
            </div>
          )}

          {/* Percentage */}

          {showLoading && (
            <h2
              className="
                mt-7
                text-5xl
                font-black
                tracking-tight
                text-white
                sm:text-6xl
              "
            >
              {progress}%
            </h2>
          )}

          {/* Status */}

          <p
            className={`
              mt-5
              text-sm
              font-semibold
              uppercase
              tracking-[0.18em]
              ${
                errorType ===
                "quota"
                  ? "text-amber-400"
                  : error
                    ? "text-red-400"
                    : showSuccess
                      ? "text-emerald-400"
                      : "text-cyan-300"
              }
            `}
          >
            {getStatus()}
          </p>

          {/* Error Content */}

          {error && (
            <div className="mt-6 w-full">
              {/* Main message */}

              <p className="text-sm leading-6 text-slate-300">
                {error}
              </p>

              {/* Quota info */}

              {errorType ===
                "quota" && (
                <>
                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    Your assessment is
                    safely saved. You
                    can retry the AI
                    analysis when the
                    service is available
                    again.
                  </p>

                  {/* Countdown */}

                  {retryAfter > 0 && (
                    <div
                      className="
                        mx-auto
                        mt-5
                        flex
                        w-fit
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-amber-400/20
                        bg-amber-400/10
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-amber-300
                      "
                    >
                      <Clock3 className="h-4 w-4" />

                      Try again in{" "}
                      <span className="font-bold">
                        {retryAfter}s
                      </span>
                    </div>
                  )}
                </>
              )}

              {/* Actions */}

              <div
                className="
                  mt-7
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-3
                  sm:flex-row
                "
              >
                {/* Retry */}

                <button
                  type="button"
                  onClick={handleRetry}
                  disabled={
                    retryAfter > 0 ||
                    isRetrying
                  }
                  className="
                    inline-flex
                    min-w-36
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-cyan-500
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-slate-950
                    shadow-lg
                    shadow-cyan-500/20
                    transition
                    hover:bg-cyan-400
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  <RefreshCw
                    className={`
                      h-4
                      w-4
                      ${
                        isRetrying
                          ? "animate-spin"
                          : ""
                      }
                    `}
                  />

                  {isRetrying
                    ? "Analyzing..."
                    : retryAfter > 0
                      ? `Wait ${retryAfter}s`
                      : "Try Again"}
                </button>

                {/* Back */}

                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isRetrying}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-900/70
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-slate-300
                    transition
                    hover:border-slate-600
                    hover:bg-slate-800
                    hover:text-white
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  <ArrowLeft className="h-4 w-4" />

                  Back to Assessment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}