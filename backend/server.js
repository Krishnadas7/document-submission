import express from 'express'
import dotenv from 'dotenv'
import { dbConnection } from './src/config/db.js'
import { userRouter } from './src/routes/userRouter.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(cors({
    origin:"*"
}))
dotenv.config()
dbConnection()
const PORT = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get('/',(req,res)=>{
    res.send('server started')
})

app.use('/api/users',userRouter)

app.listen(3000,()=>{
    console.log(`server connected on port http://localhost:${PORT}` );
    
})