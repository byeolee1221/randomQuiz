import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: { type: String },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" }
  }, {
  timestamps: true
}
);

const Question = mongoose.models["Question"] || mongoose.model("Question", questionSchema);

export default Question;