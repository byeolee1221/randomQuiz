import Members from "@/lib/models/members";
import dbConnect from "@/lib/mongoDB";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { members, teamId } = req.body;
      
      const savedMembers = await Promise.all(
        members.map(async (name: string) => {
          const newMember = new Members({ name: name, teamId });
          return await newMember.save();
        })
      );
      
      return res.status(200).json({ members: savedMembers });
    } catch (error) {
      console.error("팀원 저장 api에서 오류 발생", error);
      return res.status(500).json({ error });
    }
  }
}