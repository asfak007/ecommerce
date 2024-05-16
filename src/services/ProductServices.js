import BrandModel from "../models/BrandModel";
import CategoryModel from "../models/CategoryModel";
import SliderModel from "../models/ProductSliderModel";


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

module.exports = {BrandListService,CategoryListService,SliderListService};