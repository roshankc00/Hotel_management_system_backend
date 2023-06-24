import express from 'express'
import 'dotenv/config'
import env from './utils/validateEnv'
import connectDb from './config/connectDb'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import hpp from 'hpp'
import cors from 'cors'
import xss from 'xss'
import { errorHandler, notFound } from './middlewares/errorHandler'
import blogRoute from './routes/blogRoute'
import stafRoute from './routes/stafRoute'
import testinomialRoute from './routes/testinomiaRoute'
import roomRoute from './routes/roomRoute'
import userRoute from './routes/userRoute'
import foodRoute from './routes/foodRoute'
import MeetRoute from './routes/meetingRoute'
import SwaggerRoute from './routes/swaggerRoute'
import morgan from 'morgan'

// rest variables
const app=express() 
const PORT=env.PORT

// connecting to the database
connectDb()

// configuring the cloudinary 


// all the middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())
app.use(cors())

// all the routes


app.use('/api/v1',blogRoute)
app.use('/api/v1',stafRoute)
app.use('/api/v1',testinomialRoute)
app.use('/api/v1',userRoute)
app.use('/api/v1',foodRoute)
app.use('/api/v1',roomRoute)
app.use('/api/v1',MeetRoute)
app.use('/swagger',SwaggerRoute)


app.use(notFound)
app.use(errorHandler)

app.listen(PORT,()=>{
  
 
    console.log(`running at the ${PORT}`)
    
})