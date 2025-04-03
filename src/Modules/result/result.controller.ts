import httpStatus from "http-status";
import sendResponse from "../../Utility/sendResponse";
import catchAsync from "../../Utility/catchAsync";
import { Request, Response } from "express";
import resultService from "./result.service";

const create = catchAsync(async (req: Request, res: Response) => {
    const data = await resultService.create(req.body);
    sendResponse(res, {
      data,
      success: true,
      statusCode: httpStatus.OK,
      message: "Questions created.",
    });
  }); 
  
const leaderBoardRank = catchAsync(async (req: Request, res: Response) => {
    const data = await resultService.leaderBoardRank();
    sendResponse(res, {
      data,
      success: true,
      statusCode: httpStatus.OK,
      message: "all ranking retrieved.",
    });
  }); 

  const aStudentAllResult = catchAsync(async (req: Request, res: Response) => {
    const data = await resultService.aStudentAllResult(req.params.id);
    sendResponse(res, {
      data,
      success: true,
      statusCode: httpStatus.OK,
      message: "a student all result retrieved.",
    });
  }); 

  const resultController={create,leaderBoardRank,aStudentAllResult}
  export default resultController