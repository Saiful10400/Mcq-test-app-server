import appError from "../../Errors/appError";
import examModel from "../exam/exam.model";
import { tExam } from "../exam/exam.types";
import questionPappersModel from "../question/question.model";
import { tQuestionPapper } from "../question/question.types";
import resultModel from "./result.model";

const create = async (payload: {
  examSlug: string;
  selectedAns: { ans: string; index: number }[];
}) => {
  const exam: tExam | null = await examModel.findOne({
    slug: payload.examSlug,
  });

  if (!exam) throw new appError(404, "invalid paramitre.");

  const questionPapper: tQuestionPapper | null =
    await questionPappersModel.findById(exam.questionPapper);

  const correctQuestionIndex: number[] = [];
  const incorrectQuestionIndex: number[] = [];

  payload.selectedAns.map((item) => {
    const qeustion = questionPapper?.questions[item.index];
    if (qeustion?.correctAns === item.ans)
      correctQuestionIndex.push(item.index);
    else incorrectQuestionIndex.push(item.index);
  });

  const result = await resultModel.create({
    correctQuestionIndex,
    incorrectQuestionIndex,
    selectedAns: payload.selectedAns,
    totalQuestion: questionPapper?.questions?.length,
    exam: exam._id,
  });
  // update exam collection.
  const examCollection = await examModel.findByIdAndUpdate(exam._id, {
    result: correctQuestionIndex.length,hasTaken:true
  });
  return { result, examCollection };
};

const resultService = { create };
export default resultService;
