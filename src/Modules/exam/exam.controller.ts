import httpStatus from "http-status";
import catchAsync from "../../Utility/catchAsync";
import { Request, Response } from "express";
 
import sendResponse from "../../Utility/sendResponse";
import examService from "./exam.service";

// create question
const createExam = catchAsync(async (req: Request, res: Response) => {
    const data = await examService.createOne(req.body);
    sendResponse(res, {
      data,
      success: true,
      statusCode: httpStatus.OK,
      message: "exam created.",
    });
  }); 


 
const findAExam = catchAsync(async (req: Request, res: Response) => {
    const data = await examService.findOne(req.params.slug);
    sendResponse(res, {
      data,
      success: true,
      statusCode: httpStatus.OK,
      message: "a exma retrieved.",
    });
  });
 


const findAllExam = catchAsync(async (req: Request, res: Response) => {
    const data = await examService.findAll();
    sendResponse(res, {
      data,
      success: true,
      statusCode: httpStatus.OK,
      message: "all exam retrieved.",
    });
  });

  const examController={createExam,findAExam,findAllExam}

  export default examController