import { model, Schema } from "mongoose";
import { tStudent } from "./auth.types";

const studentSchema = new Schema<tStudent>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
      default:"https://i.ibb.co.com/8L64LVP0/default-avatar-profile-icon-vector-600nw-1745180411.webp"
    },
    class: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
  },
  { timestamps: true }
);

const studentModel = model<tStudent>("auth", studentSchema);

export default studentModel;
