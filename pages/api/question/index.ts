import Question from "@/lib/models/question";
import dbConnect from "@/lib/mongoDB";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { question, teamId } = req.body;

      const exceptNullQuestion = question.filter((q: string) => q !== null && q !== undefined);

      const existingCheck = await Question.find({ teamId, question: { $in: exceptNullQuestion } });

      if (existingCheck.length > 0) {
        await Question.deleteMany({ teamId, question: { $in: exceptNullQuestion } });
      }
  
      const savedQuestion = await Question.insertMany(exceptNullQuestion.map((q: string) => ({ question: q, teamId })));
      return res.status(201).json({ questions: savedQuestion });
    } catch (error) {
      console.error("질문 저장 api에서 오류 발생", error);
      return res.status(500).json({ error });
    }
  }
}