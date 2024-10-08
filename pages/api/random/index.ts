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
        return res.status(400).json({ message: "팀원이 등록됐는지 확인해주세요." });
      }
      
      const mixMembers = members.sort(() => Math.random() - 0.5);
      const assignedAnswer = questions.map((question, i) => ({
        question: question.question,
        member: mixMembers[i].name
      }))

      return res.status(200).json({ assignedAnswer });
    } catch (error) {
      console.error("랜덤문제 생성 api에서 오류 발생", error);
      return res.status(500).json({ error });
    }
  }
}