import mongoose from "mongoose"

export type tResult={
    student:mongoose.Schema.Types.ObjectId;
    exam:mongoose.Schema.Types.ObjectId;
    selectedAns:{index:number,ans:string}[];
    correctQuestionIndex:{index:number,ans:string}[];
    incorrectQuestionIndex:{index:number,ans:string}[];
    totalQuestion:number
}




type StudentDetails = {
    _id: string;
    name: string;
    class: number;
    gender: "male" | "female";
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
  };
  
  type StudentExamRecord = {
    _id: string;
    totalExams: number;
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    studentDetails: StudentDetails;
  };
  
  export type tStudentRanks = StudentExamRecord[];
  