import dbConnect from "@/lib/mongoDB";
import type { NextApiResponse, NextApiRequest } from "next";
import Team from "@/lib/models/team";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  
  if (req.method === "POST") {
    try {
      const { team, members } = req.body;

      const newTeam = new Team({ team, members: members || [] });
      await newTeam.save();

      return res.status(201).json({ team: newTeam });
    } catch (error) {
      console.error("팀 저장 POST api에서 오류 발생", error);
      return res.status(500).json({ error });
    }
  }

  if (req.method === "GET") {
    try {
      const teams = await Team.find();
      return res.status(200).json(teams);
    } catch (error) {
      console.error("팀 저장 GET api에서 오류 발생", error);
      return res.status(500).json({ error });
    }
  }
}