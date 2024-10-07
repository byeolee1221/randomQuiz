import { z } from "zod";

const defaultSchema = z
  .string()
  .min(1, { message: "문제를 입력해주세요." })
  .trim()
  .optional();

export const questionSchema = z.object({
  q1: defaultSchema,
  q2: defaultSchema,
  q3: defaultSchema,
  q4: defaultSchema,
  q5: defaultSchema,
});