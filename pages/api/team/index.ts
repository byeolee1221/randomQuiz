import dbConnect from "@/lib/mongoDB";
import type { NextApiResponse, NextApiRequest } from "next";
import Team from "@/lib/models/team";
import Question from "@/lib/models/question";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  
  if (req.method === "POST") {
    try {
      const { team, members } = req.body;

      const existingCheck = await Team.findOne({ team });

      if (existingCheck) {
        await Question.deleteMany({ teamId: existingCheck._id });
        await Team.deleteOne({ _id: existingCheck._id });
      }

      const newTeam = new Team({ team, members: members || [] });
      await newTeam.save();

      return res.status(201).json({ team: newTeam });
    } catch (error) {
      console.error("팀 저장 POST api에서 오류 발생", error);
      return res.status(500).json({ error });
    }
  }
}