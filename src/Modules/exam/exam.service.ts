import mongoose from "mongoose";
import studentModel from "../auth/auth.model";
import { tStudent } from "../auth/auth.types";
import questionPappersModel from "../question/question.model";
import { tQuestionPapper } from "../question/question.types";
import examModel from "./exam.model";
import resultModel from "../result/result.model";

const createOne = async (payload: {
  student: string;
  questionPapper: string;
}) => {
  const student: tStudent | null = await studentModel.findById(
    new mongoose.Types.ObjectId(payload.student)
  );
  const question: tQuestionPapper | null = await questionPappersModel.findById(
    payload.questionPapper
  );
  const slug = `${student?.name.split(" ").join("-")}_class-${
    student?.class
  }_will-conduct_${question?.name
    .split(" ")
    .join("-")}_subject-${question?.subject
    .split(" ")
    .join("-")}_exam-no-${Date.now()}`;

  const result = examModel.create({ ...payload, slug });
  return result;
};

const findOne = async (slug: string) => {
  const result = await examModel
    .findOne({ slug })
    .populate("student")
    .populate("questionPapper");

  if (result?.hasTaken) {
    return await resultModel.findOne({
      exam: new mongoose.Types.ObjectId(result._id),
    }).populate({path:"exam",populate:[{path:"student"},{path:"questionPapper"}]});
  }
  return result;
};

const findAll = async () => {
  const result = await examModel
    .find()
    .populate("student")
    .populate("questionPapper");
  return result;
};

const examService = { createOne, findOne, findAll };

export default examService;
