import asyncHandler = require("express-async-handler");
import { Request, Response, RequestHandler } from "express";
import {
  achievement,
  allstaf,
  createStafInterfaceValid,
  createStafRes,
  getStaf,
  promote,
  resMe,
  stafAchievementValid,
  stafData,
  stafPositionValid,
  updateStafInterfaceValid,
  updateStafRes,
} from "../interfaces/staf.interfaces";
import StafModel from "../models/stafmodel";
import validateMongodbId from "../utils/mongodbIdValidator";





// create the staf 
export const createStaf: RequestHandler = asyncHandler(
  async (req: Request<any, any, stafData, any>, res: Response<createStafRes>) => {
    try {
      const { name, address, position, salary, email, phoneNumber, age } =
        req.body;
      const chectStaf = await StafModel.findOne({ email });
      console.log(chectStaf);
      if (chectStaf) {
        throw new Error("this user already exists");
      }
      // validation starts 
      let result = createStafInterfaceValid.safeParse(req.body);
      let wow: any = JSON.stringify(result, null, 2);
      wow = JSON.parse(wow);
      console.log(wow);
      if (!wow.success) {
        res.status(400).json({
          sucess: false,
          error: wow,
        });
        return;
        // validation ends here 
      } else {
        const staf = await StafModel.create({
          name,
          email,
          position,
          salary,
          phoneNumber,
          address,
          age,
        });
        res.status(200).json({
          sucess: true,
          message: "staf created sucessfully",
          staf
        });
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
);




// get a single staf
export const getSingleStaf: RequestHandler = asyncHandler(
  async (req: Request, res: Response<getStaf>) => {
    try {
      const { id } = req.params;
      validateMongodbId(id);
      const staf = await StafModel.findById(id);
      if (!staf) {
        throw new Error("user not found");
      }
      res.status(200).json({
        sucess: true,
        staf,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
export const getAllStaf: RequestHandler = asyncHandler(
  async (req: Request, res: Response<allstaf>) => {
    try {
      const stafs = await StafModel.find({});
      res.status(200).json({
        sucess: true,
        stafs,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
);






// update the staf 
export const updateStaf: RequestHandler = asyncHandler(
  async (req: Request, res: Response<updateStafRes>) => {
    try {
      const id: string = req.params.id;
      validateMongodbId(id);
      const checkstaf = await StafModel.findById(id);
      if (!checkstaf) {
        throw new Error("no staf exists");
      }
      // validation starts here 
      let result = updateStafInterfaceValid.safeParse(req.body);
      let wow: any = JSON.stringify(result, null, 2);
      wow = JSON.parse(wow);
      console.log(wow);
      if (!wow.success) {
        res.status(400).json({
          sucess: false,
          error: wow,
        });
        return;
        // validation ends here 
      } else {
        const staf = await StafModel.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.status(200).json({
          sucess:true,
          message:"staf updated sucessfully",
          staf,
        });
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
);









// delete the staf
export const deleteStaf: RequestHandler = asyncHandler(
  async (req: Request, res: Response<resMe>) => {
    try {
      const id: string = req.params.id;
      validateMongodbId(id);
      const staf = await StafModel.findByIdAndDelete(id);
      if (!staf) {
        throw new Error("staf not found");
      }
      res.status(200).json({
        sucess: true,
        message: "staf deleted sucess fully",
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
);








// add the staf achievement
export const addAcheivementStaf: RequestHandler = asyncHandler(
  async (req: Request<any, any, achievement, any>, res: Response) => {
    try {
      const achievement = req.body.achievement;
      if (achievement.length <= 5) {
        throw new Error("enter the valid achievement");
      }
      const id: string = req.params.id;
      validateMongodbId(id);
    //   vaditionn starts 
      let result = stafAchievementValid.safeParse(req.body);
      let wow: any = JSON.stringify(result, null, 2);
      wow = JSON.parse(wow);
      console.log(wow);
      if (!wow.success) {
        res.status(400).json({
          sucess: false,
          error: wow,
        });
        return;
        // validation ends here 
      } else {
        const staf = await StafModel.findById(id);

        if (!staf) {
          throw new Error("user not found");
        }
        console.log("wow");

        staf.acheiveaments.push(achievement);
        await staf.save();
        console.log(staf);
        res.status(200).json({
          sucess: true,
          staf,
        });
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
);









// promote the staf
export const promoteStaf: RequestHandler = asyncHandler(
  async (req: Request<any, any, promote>, res: Response) => {
    try {
      const id: string = req.params.id;
      validateMongodbId(id);
      const position = req.body.position;
      if (position.length <= 3) {
        throw new Error("enter the valid achievement");
      }
    //   validation strats here 
      let result = stafPositionValid.safeParse(req.body);
      let wow: any = JSON.stringify(result, null, 2);
      wow = JSON.parse(wow);
      console.log(wow);
      if (!wow.success) {
        res.status(400).json({
          sucess: false,
          error: wow,
        });
        return;
        // validation ends here 
      } else {
        const staf = await StafModel.findById(id);
        if (!staf) {
          throw new Error("user not found");
        }
        staf.position = position;
        await staf.save();
        res.status(200).json({
          sucess: true,
          message: "staf has been promoted",
          staf
        });
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
