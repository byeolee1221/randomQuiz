import mongoose from "mongoose";

const membersSchema = new mongoose.Schema(
  {
    name: { type: String },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" }
  }, {
    timestamps: true
  }
);

const Members = mongoose.models["Member"] || mongoose.model("Member", membersSchema);

export default Members;