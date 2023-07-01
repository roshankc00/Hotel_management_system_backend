import passport from "passport";
import { Request, Response } from "express";
import { Strategy } from "passport-google-oauth20";
import env from "../utils/validateEnv";
import UserModel from "../models/usermodel";

const clientId = env.GOOGLE_CLIENT_ID ?? "";
const clientSecret = env.GOOGLE_CLIENT_SECRET ?? "";

export const passportInitialize = () => {
  passport.use(
    new Strategy(
      {
        clientID: clientId,
        clientSecret: clientSecret,
        callbackURL: "/auth/google/callback",
      },
      async function (
        accessToken: string,
        refreshToken: string,
        profile: any,
        cb: any
      ) {
        console.log(profile);
        const existUser:any =await UserModel.findOne({email:profile['_json'].email})

        if(existUser){
          cb(null, profile);
        }
        else{
          const data={
            fullName:profile['_json'].name,
            email:profile['_json'].email,
          }
          await UserModel.create(data)
          cb(null, profile);
        }
      }
    )
  );
  

  passport.serializeUser((user: object, done: any) => {
    done(null, user);
  });
  passport.deserializeUser((user: object, done: any) => {
    done(null, user);
  });
};

export default passport;
