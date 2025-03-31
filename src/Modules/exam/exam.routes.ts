import { Router } from "express";
import examController from "./exam.controller";
 

const exmaRoute=Router()

exmaRoute.post("/create-one",examController.createExam)

exmaRoute.get("/:slug",examController.findAExam)



export default exmaRoute