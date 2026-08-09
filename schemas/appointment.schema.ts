import { z } from "zod";

export const appointmentStatusSchema = z.enum([
  "pending",
  "approved",
  "completed",
  "cancelled",
]);

export const meetingTypeSchema = z.enum([
  "In Person",
  "Online",
  "Phone",
]);

export const createAppointmentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(100, "Title cannot exceed 100 characters."),

  description: z
    .string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters.")
    .optional()
    .or(z.literal("")),

  appointment_date: z
    .string()
    .min(1, "Appointment date is required."),

  appointment_time: z
    .string()
    .min(1, "Appointment time is required."),

  meeting_type: meetingTypeSchema.default("In Person"),

  assessment_id: z
    .string()
    .uuid("Invalid assessment ID.")
    .nullable()
    .optional(),
});

export const updateAppointmentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3)
    .max(100)
    .optional(),

  description: z
    .string()
    .trim()
    .max(1000)
    .optional(),

  appointment_date: z
    .string()
    .optional(),

  appointment_time: z
    .string()
    .optional(),

  meeting_type: meetingTypeSchema.optional(),

  meeting_link: z
    .string()
    .url("Invalid meeting link.")
    .nullable()
    .optional(),

  notes: z
    .string()
    .trim()
    .max(2000)
    .nullable()
    .optional(),

  counselor_id: z
    .string()
    .uuid("Invalid counselor ID.")
    .nullable()
    .optional(),

  status: appointmentStatusSchema.optional(),
});

export type CreateAppointmentSchema = z.infer<
  typeof createAppointmentSchema
>;

export type UpdateAppointmentSchema = z.infer<
  typeof updateAppointmentSchema
>;