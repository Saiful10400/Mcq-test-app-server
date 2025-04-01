import mongoose from "mongoose"

export type tResult={
    exam:mongoose.Schema.Types.ObjectId;
    selectedAns:{index:number,ans:string}[];
    correctQuestionIndex:number[];
    incorrectQuestionIndex:number[];
    totalQuestion:number
}