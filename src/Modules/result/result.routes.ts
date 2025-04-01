import { Router } from "express";
import resultController from "./result.controller";

const resultRoute=Router()


resultRoute.post("/create",resultController.create)
resultRoute.get("/leader-board-rank",resultController.leaderBoardRank)





export default resultRoute