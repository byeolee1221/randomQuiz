import { z } from "zod";

const defaultSchema = z
  .string()
  .min(1, { message: "이름을 확인해주세요." })
  .regex(/([A-Za-zㄱ-ㅎ가-힣])/, { message: "이름에 특수문자는 사용할 수 없습니다." })
  .trim()
  .optional();

export const membersSchema = z.object({
  member1: defaultSchema,
  member2: defaultSchema,
  member3: defaultSchema,
  member4: defaultSchema,
  member5: defaultSchema,
});
