const req = require("express/lib/request");
const BrandListService = require("../services/ProductServices");
const CategoryListService = require("../services/ProductServices");
const SliderListService = require("../services/ProductServices");


exports.ProductBrandList=async (req, res) => {
    let result = await BrandListService();
    return res.status(200).json(result);
}

exports.ProductCategoryList=async (req,res) =>{
    let resutl = await CategoryListService();
    return res.status(200).json(resutl);
}

exports.ProductSliderList=async( req,res) =>{
    let result = await SliderListService();
    return res.status(200).json(result);
}

exports.ProductListByBrand=async (req, res) => {

}

exports.ProductListByFilter = async (req,res) =>{

}

exports.ProductListByCategory=async (req, res) => {

}

exports.ProductDetails= async (req, res) => {

}

exports.ProductListBySmilier= async (req,res)=>{

}

exports.ProductListByKeyword= async (req,res)=>{

}

exports.ProductListByRemark= async (req,res)=>{

}

exports.ProductReviewList=async (req,res)=>{

}


exports.CreateProductReview=async (req,res)=>{

}

