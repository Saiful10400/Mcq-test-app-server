import { Request, Response } from "express";
import catchAsync from "../../Utility/catchAsync";
 
import httpStatus from "http-status";
import sendResponse from "../../Utility/sendResponse";
import { authService } from "./auth.service";

const createStudent = catchAsync(async (req: Request, res: Response) => {
    const data = await authService.createuser(req.body);
    sendResponse(res, {
      data,
      success: true,
      statusCode: httpStatus.OK,
      message: "New student created.",
    });
  }); 

const getAll = catchAsync(async (req: Request, res: Response) => {
    const data = await authService.getAll();
    sendResponse(res, {
      data,
      success: true,
      statusCode: httpStatus.OK,
      message: "all student retreived.",
    });
  }); 


  export const authController={createStudent,getAll}