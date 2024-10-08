import { z } from "zod";

const defaultSchema = z
  .string()
  .min(1)
  .trim();

export const questionSchema = z.object({
  q1: defaultSchema,
  q2: defaultSchema,
  q3: defaultSchema,
  q4: defaultSchema,
  q5: z.string().trim().nullable(),
});