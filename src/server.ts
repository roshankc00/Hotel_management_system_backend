import express from 'express'
import 'dotenv/config'
import env from './utils/validateEnv'
import connectDb from './config/connectDb'
import { errorHandler, notFound } from './middlewares/errorHandler'
import blogRoute from './routes/blogRoute'
import stafRoute from './routes/stafRoute'
import testinomialRoute from './routes/testinomiaRoute'
import userRoute from './routes/userRoute'
import { createUserSchema } from './validations/user.schema'

// rest variables
const app=express() 
const PORT=env.PORT

// connecting to the database
connectDb()


// all the middlewares
app.use(express.json())

// all the routes


app.use('/api/v1',blogRoute)
app.use('/api/v1',stafRoute)
app.use('/api/v1',testinomialRoute)
app.use('/api/v1',userRoute)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT,()=>{
  
 
    console.log(`running at the ${PORT}`)
    
})