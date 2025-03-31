import mongoose from "mongoose"

export type tExam={
    slug:string,
    student:mongoose.Schema.Types.ObjectId,
    questionPapper:mongoose.Types.ObjectId,
    result:string,
    time:number  // in minit
}