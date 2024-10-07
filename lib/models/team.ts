import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    team: { type: String, required: true },
    MembersId: { type: mongoose.Schema.Types.ObjectId, ref: "Members" }
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.models["Team"] || mongoose.model("Team", teamSchema);

export default Team;
