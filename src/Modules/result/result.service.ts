import mongoose from "mongoose";
import appError from "../../Errors/appError";
import examModel from "../exam/exam.model";
import { tExam } from "../exam/exam.types";
import questionPappersModel from "../question/question.model";
import { tQuestionPapper } from "../question/question.types";
import resultModel from "./result.model";
import { tStudentRanks } from "./result.types";

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

  const correctQuestionIndex: { index: number; ans: string }[] = [];
  const incorrectQuestionIndex: { index: number; ans: string }[] = [];

  payload.selectedAns.map((item) => {
    const qeustion = questionPapper?.questions[item.index];
    if (qeustion?.correctAns === item.ans)
      correctQuestionIndex.push({ index: item.index, ans: item.ans });
    else incorrectQuestionIndex.push({ index: item.index, ans: item.ans });
  });

  const result = await resultModel.create({
    correctQuestionIndex,
    incorrectQuestionIndex,
    selectedAns: payload.selectedAns,
    totalQuestion: questionPapper?.questions?.length,
    exam: exam._id,
    student: exam.student,
  });
  // console.log(result)
  // update exam collection.
  const examCollection = await examModel.findByIdAndUpdate(exam._id, {
    result: correctQuestionIndex.length,
    hasTaken: true,
  });
  return { result, examCollection };
};

const leaderBoardRank = async () => {
  const result: tStudentRanks = await resultModel.aggregate([
    {
      $group: {
        _id: "$student",
        totalExams: { $sum: 1 },
        totalQuestions: { $sum: "$totalQuestion" },
        correctAnswers: { $sum: { $size: "$correctQuestionIndex" } },
        incorrectAnswers: { $sum: { $size: "$incorrectQuestionIndex" } },
      },
    },
    {
      $lookup: {
        from: "auths", // The name of the collection containing student details
        localField: "_id", // The field from the aggregation result (_id is the student ID)
        foreignField: "_id", // The field in the students collection to match
        as: "studentDetails",
      },
    },
    {
      $unwind: "$studentDetails", // Unwind the student details array to get a single object
    },
  ]);

  // correct= +1,  incorrect 4x=-1,  notCoduct 10x=-1

  const data = result.map((item) => {
    const questionNotConducted =
      -(item.totalQuestions - (item.correctAnswers + item.incorrectAnswers)) /
      10;
    const correctAns = item.correctAnswers * 1;
    const incorrectAnswers = -item.incorrectAnswers * 0.25;

    return {
      totalExam: item.totalExams,
      TotalMark: (incorrectAnswers + correctAns + questionNotConducted).toFixed(
        2
      ),
      student: item.studentDetails,
    };
  });

  return data;
};

const aStudentAllResult = async (id: string) => {
  // const result=await resultModel.find({student:new mongoose.Types.ObjectId(id)},{_id:1,exam:1,correctQuestion:{"$size":"$correctQuestionIndex"}}).populate("exam",{slug:0})
  const result = await resultModel.aggregate([
    { $match: { student: new mongoose.Types.ObjectId(id) } },
    {
      $project: {
        exam: 1,
        totalQuestion: 1,
        correctQuestion: { $size: "$correctQuestionIndex" },
        inCorrectQuestion: { $size: "$incorrectQuestionIndex" },
        selectedAns: { $size: "$selectedAns" },
      },
    },

    // calculation.
    {
      $addFields: {
        result: {
          $add: [
            {
              $divide: [{ $subtract: ["$totalQuestion", "$selectedAns"] }, -10],
            },
            {
              $multiply: ["$correctQuestion", 1],
            },
            {
              $divide: ["$inCorrectQuestion", -4],
            },
          ],
        },
      },
    },

    {
      $lookup: {
        from: "exams",
        localField: "exam",
        foreignField: "_id",
        as: "exam",
      },
    },
    {
      $unwind: "$exam",
    },

    {
      $lookup: {
        from: "auths",
        localField: "exam.student",
        foreignField: "_id",
        as: "student",
      },
    },
    {
      $unwind: "$student",
    },
    {
      $addFields: {
        slug: "$exam.slug",
        studentName: "$student.name",
        studentImage: "$student.image",
        studentClass: "$student.class",
      },
    },

    {
      $project: {
        exam: 0,
        student: 0,
        selectedAns: 0,
        inCorrectQuestion: 0,
        correctQuestion: 0,
      },
    },

    // grouping.

    {
      $group: {
        _id: {
          name: "$studentName",
          image: "$studentImage",
          class: "$studentClass",
        },
        exams: {
          $push: {
            result: "$result",
            routeSlug: "$slug",
          },
        },
      },
    },
  ]);
  return result;
};

const resultService = { create, leaderBoardRank, aStudentAllResult };
export default resultService;
