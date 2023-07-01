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
import authRoute from './routes/auth'
import MeetRoute from './routes/meetingRoute'
import SwaggerRoute from './routes/swaggerRoute'
import morgan from 'morgan'
import passport from "passport";
import expressSession from "express-session";
import { passportInitialize } from './middlewares/passport_middleware'


// rest variables
const app=express() 
const PORT=env.PORT

// connecting to the database
connectDb()


// session
app.use(expressSession({ 
    secret: "test123#",
    resave: true,
    saveUninitialized: true,
    cookie:{secure:true}

  })
);


// all the middlewares
app.use(express.json())
app.use(morgan('dev'))
passportInitialize();
app.use(passport.initialize());
app.use(passport.session());
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
app.use('/auth',authRoute)
app.use('/swagger',SwaggerRoute)
app.use(notFound)
app.use(errorHandler)

app.listen(PORT,()=>{
  
 
    console.log(`running at the ${PORT}`)
    
})