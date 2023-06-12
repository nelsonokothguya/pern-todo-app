import express, {Express} from "express"
import cors from "cors"
import bodyParser from "body-parser"

import dotenv from "dotenv"
import { errorHandler } from "./middlewares/errorHandler"
import todoRoutes from "./routes/todoRoutes"
import deletedTodoRoutes from "./routes/deletedTodoRoutes"

dotenv.config()

const app: Express = express()

app.use(cors())
app.use(express.json())

app.use('/activetodos', todoRoutes)
app.use('/deletedtodos', deletedTodoRoutes)

app.use(errorHandler)




export default app;
