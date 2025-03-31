import { Router } from "express";
import { authController } from "./auth.controller";

const authRouter=Router()


authRouter.post("/create-student",authController.createStudent)
authRouter.get("/",authController.getAll)


export default authRouter