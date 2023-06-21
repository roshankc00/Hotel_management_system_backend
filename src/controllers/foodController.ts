import asyncHandler from 'express-async-handler';
import { Request,Response } from 'express';
import FoodModel from '../models/foodModel';
export const createFood=asyncHandler(async(req:Request,res)=>{
    try {
        const {name,price,discountPer,category}=req.body;
        let discountaPrice:number=(discountPer*price)/100;
        let priceAfterDiscount:number=price-discountaPrice;
        const food=await FoodModel.create({
            name,
            price,
            discountPer,
            priceAfterDiscount,
            category
        })
        res.status(200).json({
            sucess:true,
            food
        })
    } catch (error:any) {
        throw new Error(error)
        
    }
    
})



export const getALLFoods=asyncHandler(async(req,res:any)=>{
    try {
        const foods=await FoodModel.find({})
        let allfoods=res.filterData
        res.status(200).json({
            sucess:true,
            allfoods
            
        })

    } catch (error:any) {
        
        throw new Error(error)
    }
})