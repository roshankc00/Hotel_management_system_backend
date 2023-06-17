import express from 'express'
import 'dotenv/config'
import env from './utils/validateEnv'
import connectDb from './config/connectDb'
import { errorHandler, notFound } from './middlewares/errorHandler'
import blogRoute from './routes/blogRoute'
import stafRoute from './routes/stafRoute'
import testinomialRoute from './routes/testinomiaRoute'
import userRoute from './routes/userRoute'
import morgan from 'morgan'
import cloudinary from 'cloudinary'
// rest variables
const app=express() 
const PORT=env.PORT

// connecting to the database
connectDb()

// configuring the cloudinary 
cloudinary.v2.config({
    cloud_name:env.CLOUDINARY_CLIENT_NAME,
    api_key:env.CLOUDINARY_CLIENT_API,
    api_secret:env.CLOUDINARY_CLIENT_SECRET
})

// all the middlewares
app.use(express.json())
app.use(morgan('dev'))

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