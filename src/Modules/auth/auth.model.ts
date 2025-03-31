import { model, Schema } from "mongoose";
import { tStudent } from "./auth.types";
 

const studentSchema = new Schema<tStudent>(
  {
    name: {
      type: String,
      required: true,
    },
    class: {
      type: Number,
      required: true,
    },
    gender:{
        type:String,
        enum:["male","female"],
        required:true,
    }
    
  },
  { timestamps: true }
);

const studentModel = model<tStudent>("auth", studentSchema);

export default studentModel;
