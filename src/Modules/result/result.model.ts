import mongoose, { model, Schema } from "mongoose";
import { tResult } from "./result.types";
 

const resultSchema = new Schema<tResult>(
  {
    totalQuestion: {
      type: Number,
      required: true,
       
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "auth",
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "exam",
    },
    correctQuestionIndex: {
      type: [{index:Number,ans:String}],
      required: true,
       
    },
    incorrectQuestionIndex: {
      type: [{index:Number,ans:String}],
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
