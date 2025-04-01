import { Router } from "express";
import resultController from "./result.controller";

const resultRoute=Router()


resultRoute.post("/create",resultController.create)




export default resultRoute