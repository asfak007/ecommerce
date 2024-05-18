const BrandModel = require("../models/BrandModel");
const CategoryModel = require("../models/CategoryModel");
const SliderModel = require("../models/ProductSliderModel");
const ProductModel = require("../models/ProductModel");
const mongoose = require("mongoose");



const BrandListService= async ()=>{
    try{
        let ProjectionStage = {$project:{"createdAt":0,"updatedAt":0}};
        let data = await BrandModel.aggregate([
            ProjectionStage
        ]);
        return {status:"success",data:data}
    }catch(err){
        return {status:"fail",data:err}.toString()
    }

}

const CategoryListService= async ()=>{
    try{
        let ProjectionStage = {$project:{"createdAt":0,"updatedAt":0}};
        let data = await CategoryModel.aggregate([
            ProjectionStage
        ]);
        return {status:"success",data:data}
    }catch(err){
        return {status:"fail",data:err}.toString()
    }
}

const SliderListService= async ()=>{
    try{
        let ProjectionStage = {$project:{"createdAt":0,"updatedAt":0}};
        let data = await SliderModel.aggregate([
            ProjectionStage
        ]);
        return {status:"success",data:data}

    }catch (err){
        return {status:"fail",data:err}.toString()
    }
}

const  ListByService= async (req)=>{
    let brandID= new  mongoose.Types.ObjectId(req.params.BrandID);

    console.log(brandID);
    let MatchStage={$match:{brandID:brandID}};
    let joinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
    let JoinWithCategoryStage={$lookup: {from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};

    // unwind change map to object
    let UnwindCategoryStage={$unwind:"$category"}
    let UnwindBrandStage={$unwind:"$brand"};

    // projection is remove which data is unwanted.
    // let projection

    let data = await ProductModel.aggregate([
        MatchStage,
        joinWithBrandStage,
        JoinWithCategoryStage,
        UnwindCategoryStage,
        UnwindBrandStage
        ])
    return {status:"success",data:data};
}

module.exports = {BrandListService,CategoryListService,SliderListService,ListByService};