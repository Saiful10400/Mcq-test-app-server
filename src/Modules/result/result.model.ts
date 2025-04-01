import mongoose, { model, Schema } from "mongoose";
import { tResult } from "./result.types";
 

const resultSchema = new Schema<tResult>(
  {
    totalQuestion: {
      type: Number,
      required: true,
       
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "exam",
    },
    correctQuestionIndex: {
      type: [Number],
      required: true,
       
    },
    incorrectQuestionIndex: {
      type: [Number],
      required: true,
    },
    selectedAns:{
        type:[{index:Number,ans:String}],
        required:true
    }
  },
  { timestamps: true }
);

const resultModel = model<tResult>("result", resultSchema);

export default resultModel;
