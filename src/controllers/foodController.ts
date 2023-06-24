import asyncHandler from 'express-async-handler';
import { Request,Response } from 'express';
import FoodModel from '../models/foodModel';
import validateMongodbId from '../utils/mongodbIdValidator';
import { CustomRequest } from '../interfaces/user.interfaces';
import cloudinary from '../config/CloudinaryConfig';
import { CustomResponse, addReviewFood, createFoodResponse, deleteFoodResponse, getAllFoodResponse, getFoodsByCategoryResponse, getSingleFoodResponse, updateFoodResponse, validateCategoryFood, validateCreateFood, validateReview, validateUpdateFood } from '../interfaces/foodInterface';

// create the food 
export const createFood=asyncHandler(async(req:Request,res:Response<createFoodResponse>)=>{
    try {
        const {name,price,discountPer,category}=req.body;
             // validating the req.body type 
             let  result=validateCreateFood.safeParse(req.body)
             let wow:any=JSON.stringify(result,null,2)
              wow=JSON.parse(wow)
             if(!wow.success){
                 res.status(400).json({
                     error:wow
                 })
                 return 
             }


        const cloud:any = await cloudinary.v2.uploader.upload(req.file.path)
        let discountaPrice:number=(discountPer*price)/100;
        let priceAfterDiscount:number=price-discountaPrice;

        const food=await FoodModel.create({
            name,
            price,
            discountPer,
            priceAfterDiscount,
            category,
            image:{
                url:cloud.secure_url,
                public_id:cloud.public_id,
            }
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
export const getALLFoods=asyncHandler(async(req:Request,res:CustomResponse)=>{
    try {
        const foods=await FoodModel.find({})
        let allFoods=res.filterData
        res.status(200).json({
            sucess:true,
            allFoods
            
        })

    } catch (error:any) {
        
        throw new Error(error)
    }
})

// get  a single food 
export const getSingleFood=asyncHandler(async(req:Request,res:Response<getSingleFoodResponse>)=>{
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
export const updateFood=asyncHandler(async(req:Request,res:Response<updateFoodResponse>)=>{
    try {
        const id=req.params.id
        validateMongodbId(id)
             // validating the req.body type 
             let  result=validateUpdateFood.safeParse(req.body)
             let wow:any=JSON.stringify(result,null,2)
              wow=JSON.parse(wow)
             if(!wow.success){
                 res.status(400).json({
                     error:wow
                 })
                 return 
             }


        
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
export const deleteFood=asyncHandler(async(req:Request,res:Response<deleteFoodResponse>)=>{
    try {
        const id=req.params.id
        validateMongodbId(id)
        const food=await FoodModel.findById(id)
        if(!food){
            throw new Error("food doesnt exists")
        }
        const destroy=await cloudinary.v2.uploader.destroy(food.image.public_id)
        const delFood=await FoodModel.findByIdAndDelete(id)
        res.status(200).json({
            sucess:true,
            message:"deleted sucess fully"
        })
        
    } catch (error:any) {
        throw new Error(error)
        
    }

})


// get a product by category
export const getFoodsByCategory=asyncHandler(async(req:Request,res:Response<getFoodsByCategoryResponse>)=>{
    try {
        let {category}=req.body
                     // validating the req.body type 
                     let  result=validateCategoryFood.safeParse(req.body)
                     let wow:any=JSON.stringify(result,null,2)
                      wow=JSON.parse(wow)
                     if(!wow.success){
                         res.status(400).json({
                             error:wow
                         })
                         return 
                     }
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
export const foodsWithLimitedField=asyncHandler(async(req:Request,res:Response)=>{
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




// add review the food 

export const addReviewToFood=asyncHandler(async(req:any,res:Response<addReviewFood>)=>{
    try {
        const {rating,comment,foodId}=req.body
        validateMongodbId(foodId)
                    // validating the req.body type 
                    let  result=validateReview.safeParse(req.body)
                    let wow:any=JSON.stringify(result,null,2)
                     wow=JSON.parse(wow)
                    if(!wow.success){
                        res.status(400).json({
                            error:wow
                        })
                        return 
                    }
       

        let alreadyReviewed=false
        let ind;
        const food=await FoodModel.findById(foodId)
        if(!food){
            throw new Error("the food doesnt exists")
        }
        food.review.map(async(el,ind)=>{
            console.log("wow")
            if(el.user.toString()===req.user._id.toString()){
                console.log("wow")
                food.review.splice(ind,1)
                alreadyReviewed=true
            }
        })
        food.review.push({
            user:req.user._id,
            comment,
            rating
        }) 
      await food.save()
      res.status(200).json({
        sucess:true,
        message:"review added sucessfully",
        food
      })
      

    } catch (error:any) {
        throw new Error(error)
    }
})



// update the image 
export const changeTheFoodImage=asyncHandler(async(req,res:any)=>{
    try {
        validateMongodbId(req.params.id)
        const food=await FoodModel.findById(req.params.id)
        if(!food){
            throw new Error('food not found')
        }
        const destroy=await cloudinary.v2.uploader.destroy(food.image.public_id)
        const cloud:any = await cloudinary.v2.uploader.upload(req.file.path)
        console.log(cloud)
        food.image={
            url:cloud.secure_url,
            public_id:cloud.public_id,
        }
        
            await food.save()
           return  res.status(200).json({
                status:true,
                message:"image updated sucessfully",
                food
                
            })
            
    } catch (error:any) {
        throw new Error(error.message)
        
    }

})