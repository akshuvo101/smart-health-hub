import { z } from "zod";

export const assessmentAnswerSchema = z.object({
  questionId: z.string().uuid(),
  selectedValue: z.number().int().min(0).max(3),
});

export const assessmentSubmissionSchema = z.object({
  answers: z
    .array(assessmentAnswerSchema)
    .min(1, "At least one answer is required."),
});

export type AssessmentSubmissionInput =
  z.infer<typeof assessmentSubmissionSchema>;