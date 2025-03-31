import studentModel from "./auth.model";
import { tStudent } from "./auth.types";

const createuser = async (payload: tStudent) => {
  const result = await studentModel.create(payload);
  return result;
};

const getAll=async()=>{
    const result=await studentModel.find()
    return result
}

export const authService = { createuser,getAll };
