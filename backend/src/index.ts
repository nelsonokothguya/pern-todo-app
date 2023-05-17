import express, {Express} from "express"
import cors from "cors"
import dotenv from "dotenv"
import { errorHandler } from "./middlewares/errorHandler"
import todoRoutes from "./routes/todoRoutes"
import deletedTodoRoutes from "./routes/deletedTodoRoutes"

dotenv.config()

export const app: Express = express()

app.use(cors())
app.use(express.json())

app.use('/todos', todoRoutes)
app.use('/deleted', deletedTodoRoutes)

app.use(errorHandler)


