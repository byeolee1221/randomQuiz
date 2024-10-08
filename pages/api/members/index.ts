import Members from "@/lib/models/members";
import dbConnect from "@/lib/mongoDB";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { members, teamId } = req.body;

      const exceptNullMember = members.filter((name: string) => name !== null && name !== undefined);

      const checkExisting = await Members.find({ teamId, name: { $in: exceptNullMember } });

      if (checkExisting.length > 0) {
        await Members.deleteMany({ teamId, name: { $in: exceptNullMember } });
      }
      
      const savedMembers = await Promise.all(
        exceptNullMember.map(async (name: string) => {
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