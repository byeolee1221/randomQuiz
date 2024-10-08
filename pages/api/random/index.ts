import Members from "@/lib/models/members";
import Question from "@/lib/models/question";
import dbConnect from "@/lib/mongoDB";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { teamId } = req.query;
  
  if (req.method === "GET") {
    try {
      const members = await Members.find({ teamId });
      const questions = await Question.find();

      if (members.length === 0) {
        return res.status(400).json({ message: "팀원 또는 질문을 확인해주세요." });
      }

      await Question.deleteMany({ teamId });
      
      const mixQuestions = questions.sort(() => Math.random() - 0.5);
      const assignedAnswer = mixQuestions.map((question) => {
        const randomMember = members[Math.floor(Math.random() * members.length)];
        return {
          question: question.question,
          member: randomMember.name,
        }
      });
      
      return res.status(200).json({ assignedAnswer });
    } catch (error) {
      console.error("랜덤문제 생성 api에서 오류 발생", error);
      return res.status(500).json({ error });
    }
  }
}