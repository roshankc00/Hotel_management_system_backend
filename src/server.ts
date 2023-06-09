import express from 'express'
import 'dotenv/config'
import env from './utils/validateEnv'
import connectDb from './config/connectDb'
import { errorHandler, notFound } from './middlewares/errorHandler'

// rest cariables
const app=express() 
const PORT=env.PORT
// connecting to the database
connectDb()

// all the middlewares

// all the routes
app.get('/',(req,res)=>{
    throw new Error("wow this is good")
})

app.use(notFound)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`running at the ${PORT}`)

})