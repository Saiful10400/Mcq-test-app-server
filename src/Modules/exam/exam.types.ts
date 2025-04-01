import mongoose from "mongoose"

export type tExam={
    _id?:string,
    slug:string,
    student:mongoose.Schema.Types.ObjectId,
    questionPapper:mongoose.Types.ObjectId,
    result:string,
    time:number  // in minit
}