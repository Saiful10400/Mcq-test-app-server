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

  const correctQuestionIndex: {index:number,ans:string}[] = [];
  const incorrectQuestionIndex: {index:number,ans:string}[] = [];

  payload.selectedAns.map((item) => {
    const qeustion = questionPapper?.questions[item.index];
    if (qeustion?.correctAns === item.ans)
      correctQuestionIndex.push({index:item.index,ans:item.ans});
    else incorrectQuestionIndex.push({index:item.index,ans:item.ans});
  });

  const result = await resultModel.create({
    correctQuestionIndex,
    incorrectQuestionIndex,
    selectedAns: payload.selectedAns,
    totalQuestion: questionPapper?.questions?.length,
    exam: exam._id,
    student:exam.student
  });
  // console.log(result)
  // update exam collection.
  const examCollection = await examModel.findByIdAndUpdate(exam._id, {
    result: correctQuestionIndex.length,hasTaken:true
  });
  return { result, examCollection };
};


const leaderBoardRank=async()=>{

  const result=await resultModel.aggregate([
    {
      "$group": {
        "_id": "$student",
        "totalExams": { "$sum": 1 },
        "totalQuestions": { "$sum": "$totalQuestion" },
        "correctAnswers": { "$sum": { "$size": "$correctQuestionIndex" } },
        "incorrectAnswers": { "$sum": { "$size": "$incorrectQuestionIndex" } },
        "attempts": { "$push": "$$ROOT" }
      }
    }
  ])

return result
 

 
}

const resultService = { create,leaderBoardRank };
export default resultService;
