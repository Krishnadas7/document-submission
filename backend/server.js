import express from 'express'
import dotenv from 'dotenv'
import { dbConnection } from './src/config/db.js'
import { userRouter } from './src/routes/userRoutesd.js'

const app = express()
dotenv.config()
dbConnection()
const PORT = process.env.PORT

app.get('/',(req,res)=>{
    res.send('server started')
})

app.use('/api/user',userRouter)

app.listen(3000,()=>{
    console.log(`server connected on port http://localhost:${PORT}` );
    
})