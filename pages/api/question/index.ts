import Question from "@/lib/models/question";
import dbConnect from "@/lib/mongoDB";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { question } = req.body;
  
      const savedQuestion = await Question.insertMany(question.map((q: string) => ({ question: q })));
      return res.status(201).json({ questions: savedQuestion });
    } catch (error) {
      console.error("질문 저장 api에서 오류 발생", error);
      return res.status(500).json({ error });
    }
  }
}