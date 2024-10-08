import { z } from "zod";

const defaultSchema = z
  .string()
  .min(1)
  .regex(/([A-Za-zㄱ-ㅎ가-힣])/)
  .trim();

export const membersSchema = z.object({
  member1: defaultSchema,
  member2: defaultSchema,
  member3: defaultSchema,
  member4: defaultSchema,
  member5: z.string().nullable(),
});
