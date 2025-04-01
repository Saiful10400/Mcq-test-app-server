import { Router } from "express"
import questionPapperRoute from "../Modules/question/question.routes"
import exmaRoute from "../Modules/exam/exam.routes"
import authRouter from "../Modules/auth/auth.routes"
import resultRoute from "../Modules/result/result.routes"
 


const routes=Router()


const moduleRoutes=[

    {
        path:"/question-papper",
        route:questionPapperRoute
    },
    {
        path:"/exam",
        route:exmaRoute
    },
    {
        path:"/auth",
        route:authRouter
    }
    ,
    {
        path:"/result",
        route:resultRoute
    }
]

moduleRoutes.forEach(item=>routes.use(item.path,item.route))

 



export default routes