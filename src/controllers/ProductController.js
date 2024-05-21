const req = require("express/lib/request");
const Services = require("../services/ProductServices");

const {ListByService, CategoryListService, SliderListService, ListByCategoryService, ListByRemarkService,
    ListBySmilierService, ProductDetailService, ListByKeywordService
} = require("../services/ProductServices");


exports.ProductBrandList=async (req, res) => {
    let result = await Services.BrandListService();
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
    let result = await ListByService(req)
    return res.status(200).json(result);
}

exports.ProductListByFilter = async (req,res) =>{

}

exports.ProductListByCategory=async (req, res) => {
    let result = await ListByCategoryService(req)
    return res.status(200).json(result);
}


exports.ProductListByRemark= async (req,res)=>{
     let result = await ListByRemarkService(req);
     return res.status(200).json(result);
}

exports.ProductDetails= async (req, res) => {
   let result = await  ProductDetailService(res)
    return res.status(200).json(result);
}

exports.ProductListBySmilier= async (req,res)=>{
   let result = await ListBySmilierService(req);
   return res.status(200).json(result);
}

exports.ProductListByKeyword= async (req,res)=>{
       let result = await ListByKeywordService(req)
}



exports.ProductReviewList=async (req,res)=>{

}


exports.CreateProductReview=async (req,res)=>{

}

