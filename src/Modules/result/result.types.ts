import mongoose from "mongoose"

export type tResult={
    student:mongoose.Schema.Types.ObjectId;
    exam:mongoose.Schema.Types.ObjectId;
    selectedAns:{index:number,ans:string}[];
    correctQuestionIndex:{index:number,ans:string}[];
    incorrectQuestionIndex:{index:number,ans:string}[];
    totalQuestion:number
}