import mongoose, { model, Schema } from "mongoose";
import { tExam } from "./exam.types";

const examSchema = new Schema<tExam>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    hasTaken: {
      type: Boolean,
      required: false,
      default:false
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "auth",
    },
    questionPapper: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "questionPapper",
    },
    result: {
      type: String,
      required: false,
      default: "exam not conducted.", 
    },
    time: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const examModel = model<tExam>("exam", examSchema);

export default examModel;
