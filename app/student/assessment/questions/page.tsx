

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import AssessmentProgress from "@/components/assessment/assessment-progress";
import QuestionCard from "@/components/assessment/question-card";

import { AssessmentQuestion } from "@/types/assessment";
import { getAssessmentQuestions } from "@/services/assessment.client";

export default function AssessmentQuestionsPage() {
  const router = useRouter();

  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] =
    useState<Record<string, number>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Load assessment questions
   */
  useEffect(() => {
    async function loadQuestions() {
      try {
        setLoading(true);
        setError("");

        const data = await getAssessmentQuestions();

        setQuestions(data);
      } catch (err) {
        console.error(
          "Failed to load assessment questions:",
          err
        );

        setError(
          "Failed to load assessment questions."
        );
      } finally {
        setLoading(false);
      }
    }

    loadQuestions();
  }, []);

  /**
   * Current question
   */
  const currentQuestion =
    questions[currentIndex];

  /**
   * Question progress
   */
  const progress = useMemo(
    () => currentIndex + 1,
    [currentIndex]
  );

  /**
   * Select answer
   */
  const handleSelect = (value: number) => {
    if (!currentQuestion) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  /**
   * Previous question
   */
  const handlePrevious = () => {
    if (currentIndex === 0) return;

    setCurrentIndex(
      (prev) => prev - 1
    );
  };

  /**
   * Next question
   */
  const handleNext = () => {
    if (
      currentIndex <
      questions.length - 1
    ) {
      setCurrentIndex(
        (prev) => prev + 1
      );
    }
  };

  /**
   * Submit assessment
   */
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const payload = {
        answers: Object.entries(
          answers
        ).map(
          ([
            questionId,
            selectedValue,
          ]) => ({
            questionId,
            selectedValue,
          })
        ),
      };

      const response =
        await fetch(
          "/api/assessment",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              payload
            ),
          }
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success ||
        !result.data?.assessmentId
      ) {
        throw new Error(
          result.message ??
          "Failed to submit assessment."
        );
      }

      /**
       * Save assessment ID temporarily
       *
       * Loading page will use this ID
       * to start AI analysis.
       */
      sessionStorage.setItem(
        "assessmentId",
        result.data.assessmentId
      );

      /**
       * Move immediately to loading page.
       */
      router.push(
        "/student/assessment/loading"
      );
    } catch (error) {
      console.error(
        "Assessment submission error:",
        error
      );

      setIsSubmitting(false);
    }
  };

  /**
   * Loading state
   */
  if (loading) {
    return (
      <section className="flex min-h-[400px] items-center justify-center">
        <div className="text-sm text-slate-500">
          Loading assessment...
        </div>
      </section>
    );
  }

  /**
   * Error state
   */
  if (error && !currentQuestion) {
    return (
      <section className="flex min-h-[400px] items-center justify-center">
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
          {error}
        </div>
      </section>
    );
  }

  /**
   * No questions
   */
  if (!currentQuestion) {
    return (
      <section className="flex min-h-[400px] items-center justify-center">
        <div className="text-sm text-slate-500">
          No assessment questions found.
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-3xl">
      {/* Assessment Progress */}

      <AssessmentProgress
        currentQuestion={progress}
        totalQuestions={questions.length}
      />

      {/* Error while submitting */}

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Question */}

      <QuestionCard
        question={currentQuestion}
        selectedValue={
          answers[currentQuestion.id] ??
          null
        }
        onSelect={handleSelect}
        isFirstQuestion={
          currentIndex === 0
        }
        isLastQuestion={
          currentIndex ===
          questions.length - 1
        }
        canProceed={
          answers[
          currentQuestion.id
          ] !== undefined
        }
        isSubmitting={isSubmitting}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </section>
  );
}