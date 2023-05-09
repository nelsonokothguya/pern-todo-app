import express, {Express, Request, Response, NextFunction} from "express"
import cors from "cors"
import dotenv from "dotenv"
import { asyncMiddleware } from "./middlewares/asyncMiddleware"



dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())


app.get("/", asyncMiddleware(async(req: Request, res: Response)=> {
    res.send("Port is ready")
}))


app.use((err: Error, req: Request, res: Response, next: NextFunction)=> {
console.error(err.message)
res.status(500).send("Server Error")
})




app.listen(PORT, ()=> {console.log(`Listening to PORT ${PORT}`)})
