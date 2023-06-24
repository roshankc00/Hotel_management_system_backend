import asyncHandler from 'express-async-handler';
import { Request,Response } from 'express';
import FoodModel from '../models/foodModel';
import validateMongodbId from '../utils/mongodbIdValidator';
import { CustomRequest } from '../interfaces/user.interfaces';

// create the food 
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


// get all the foods 
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

// get  a single food 
export const getSingleFood=asyncHandler(async(req:Request,res:Response)=>{
    try {
        const id=req.params.id
        validateMongodbId(id)
        const food=await FoodModel.findById(id)
        if(!food){
            throw new Error("food doesnt exists")
        }else{
            res.status(200).json({
                sucess:true,
                food
            })
        }
        
    } catch (error:any) {
        throw new Error(error)
        
    }

})


// update the food
export const updateFood=asyncHandler(async(req:any,res:Response)=>{
    try {
        const id=req.params.id
        validateMongodbId(id)
        const food=await FoodModel.findById(id)
        if(!food){
            throw new Error("food doesnt exists")
        }
        if(!req.body.discountPer){
            req.body.discountPer=food.discountPer           
        }
        if(!req.body.price){
            req.body.price=food.price                    
        }
        const updFood=await FoodModel.findByIdAndUpdate(id,req.body,{new:true})

        res.status(200).json({
            sucess:true,
            message:"food updated sucessfully",
            updatedFood:updFood
        })
        
    } catch (error:any) {
        throw new Error(error)
    }
})




// delete the food 
export const deleteFood=asyncHandler(async(req:Request,res:Response)=>{
    try {
        const id=req.params.id
        validateMongodbId(id)
        const food=await FoodModel.findById(id)
        if(!food){
            throw new Error("food doesnt exists")
        }
        const delFood=await FoodModel.findByIdAndDelete(id)
        res.status(200).json({
            sucess:true,
            messagea:"deleted sucess fully"
        })
        
    } catch (error:any) {
        throw new Error(error)
        
    }

})


// get a product by category
export const getFoodsByCategory=asyncHandler(async(req,res)=>{
    try {
        let {category}=req.body
        let foods=await FoodModel.find({category})
        if(!foods){
            throw new Error("no food found")
        }
        res.status(200).json({
            sucess:true,
            foods
        })

    } catch (error:any) {
        throw new Error(error)        
    }
})

// get foods  with name price discountper priceAfterDiscount
export const foodsWithLimitedField=asyncHandler(async(req,res)=>{
    try {
        const product=await FoodModel.find({}).select('name price discountPer priceAfterDiscount')
        let length=product.length
        res.status(200).json({
            sucess:true,
            product,
            length

        })
    } catch (error:any) {
        throw new Error(error)
        
    }
})