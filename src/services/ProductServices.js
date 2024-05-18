const BrandModel = require("../models/BrandModel");
const CategoryModel = require("../models/CategoryModel");
const SliderModel = require("../models/ProductSliderModel");
const ProductModel = require("../models/ProductModel");
const mongoose = require("mongoose");



const BrandListService= async ()=>{
    try{
        let data = await BrandModel.find();
        return {status:"success",data:data}
    }catch(err){
        return {status:"fail",data:err}.toString()
    }

}

const CategoryListService= async ()=>{
    try{
        let data = await CategoryModel.find();
        return {status:"success",data:data}
    }catch(err){
        return {status:"fail",data:err}.toString()
    }
}

const SliderListService= async ()=>{
    try{
        let data = await SliderModel.find();

    }catch (err){
        return {status:"fail",data:err}.toString()
    }
}

const  ListByService= async (req)=>{
    let brandId= mongoose.Types.ObjectId(req.params.BrandID);
    let MatchStage={$match:{brandId:brandId}};
    let joinWtihBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brands"}};
    let JoinWithCategoryStage={$lookup: {from:"categories",localField:"CategoryID",foreignField:"_id",as:"categories"}};
    let data = await ProductModel.aggregate([
        MatchStage,
        joinWtihBrandStage,
        JoinWithCategoryStage,
        ])
    return {status:"success",data:data};
}

module.exports = {BrandListService,CategoryListService,SliderListService,ListByService};