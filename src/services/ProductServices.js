const BrandModel = require("../models/BrandModel");
const CategoryModel = require("../models/CategoryModel");
const SliderModel = require("../models/ProductSliderModel");
const ProductModel = require("../models/ProductModel");
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;

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

    try{

        let brandID= new  mongoose.Types.ObjectId(req.params.BrandID);

        let MatchStage={$match:{brandID:brandID}};
        let joinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage={$lookup: {from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};

        // unwind change map to object
        let UnwindCategoryStage={$unwind:"$category"}
        let UnwindBrandStage={$unwind:"$brand"};

        // projection is remove which data is unwanted.
        let projectionStage = {$project: {'brand._id': 0,'brand.updatedAt':0,'brand.createdAt':0,'category._id':0,'category.updatedAt':0,'category.createdAt':0,'createdAt':0,'updatedAt':0,},}

        let data = await ProductModel.aggregate([
            MatchStage,
            joinWithBrandStage,
            JoinWithCategoryStage,
            UnwindCategoryStage,
            UnwindBrandStage,
            projectionStage
        ])

        return {status:"success",data:data};

    }catch (e) {
        return {status:"fail",data:e}.toString()
    }

}

const ListByCategoryService= async (req)=>{
    try{
        let CategoryId = new ObjectID(req.params.CategoryID);

        let MatchStage = {$match: {categoryID:CategoryId}};
        let JoinWithBrandStage = {$lookup: {from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandStage = {$unwind:"$brand"};
        let UnwindCategoryStage = {$unwind:"$category"};

        let ProjectionStage = {$project:{'createdAt':0,'updatedAt':0,'brand._id':0,'brand.updatedAt':0,'brand.createdAt':0,'category._id':0,'category.createdAt':0,'category.updatedAt':0}};

        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
            
        ])

        return {status:"success",data:data};

    }catch(err){
        return {status:"fail",data:err}.toString()
    }
}

const ListByRemarkService= async (req)=>{
    try {
        let Remark = req.params.Remark;
        let MatchStage = {$match:{remark:Remark}};
        let JoinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandStage = {$unwind:"$brand"}
        let UnWindCategoryStage = {$unwind:"$category"};

        let ProjctionStage ={$project:{'createdAt':0,'updatedAt':0,'brand._id':0,'brand.updatedAt':0,'brand.createdAt':0,'category._id':0,'category.createdAt':0,'category.updatedAt':0}}

        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            UnwindBrandStage,
            JoinWithCategoryStage,
            UnWindCategoryStage,
            ProjctionStage
        ])
        return {status:"success",data:data}
    }catch (e) {
        return {status:"fail",data:e}.toString()
    }
}

const ListBySmilierService = async (req)=>{
    try{
        let CategoryId = new ObjectID(req.params.CategoryID);
        let MatchStage = {$match: {categoryID:CategoryId}};

        let limitStage = {$limit:20}

        let JoinWithBrandStage = {$lookup: {from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandStage = {$unwind:"$brand"};
        let UnwindCategoryStage = {$unwind:"$category"};

        let ProjectionStage = {$project:{'createdAt':0,'updatedAt':0,'brand._id':0,'brand.updatedAt':0,'brand.createdAt':0,'category._id':0,'category.createdAt':0,'category.updatedAt':0}};

        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage,
            limitStage

        ])

        return {status:"success",data:data};

    }catch(err){
        return {status:"fail",data:err}.toString()
    }
}

const ProductDetailService= async (req)=>{

    try{

        let ProductId = new ObjectID(req.params.ProductID)

        let MatchStage = {$match: {_id:ProductId}}
        //Join Stage
        let joinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let JoinWithProductDetailsStage = {$lookup:{form:"productDetails",localField:"productID",foreignField:"_id",as:"productDetails"}}
        // unwind Stage
        let UnWindCategoryStage = {$unwind:"$category"}
        let UnwindBrandStage = {$unwind:"$brand"}
        let UnWindProductDetailsStage = {$unwind:"$productDetails"};

        // projection Stage
        let ProjectionStage = {$project:{'createdAt':0,'updatedAt':0,'brand._id':0,'brand.updatedAt':0,'brand.createdAt':0,'category._id':0,'category.createdAt':0,'category.updatedAt':0}};


        let data =  await ProductModel.aggregate({
            MatchStage,
            joinWithBrandStage,
            JoinWithCategoryStage,
            JoinWithProductDetailsStage,
            UnWindCategoryStage,
            UnwindBrandStage,
            UnWindProductDetailsStage,
            ProjectionStage,
        });

        return {status:"success",data:data}

    }catch(err){
        return {status:"fail",data:err}.toString()
    }

}

const ListByKeywordService = async (req)=>{

    try{

        let SearchRegex = {"$regex":req.params.keyword,"$options":"i"}
        let SearchParams = [{title:SearchRegex},{shortDes:SearchRegex}];
        let SearchQuery = {"$or":SearchParams};

        let MatchStage = {$match:SearchQuery};

        //Join Stage
        let joinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        // unwind Stage
        let UnWindCategoryStage = {$unwind:"$category"}
        let UnwindBrandStage = {$unwind:"$brand"}
        let UnWindProductDetailsStage = {$unwind:"$productDetails"};

        let ProjectionStage = {$project:{'createdAt':0,'updatedAt':0,'brand._id':0,'brand.updatedAt':0,'brand.createdAt':0,'category._id':0,'category.createdAt':0,'category.updatedAt':0}};


        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithCategoryStage,
            joinWithBrandStage,
            UnWindCategoryStage,
            UnwindBrandStage,
            UnWindProductDetailsStage,
            ProjectionStage
        ])

        return {status:"success",data:data};


    }catch (e) {
        return {status:"fail",data:e}.toString()
    }


}

module.exports = {
    BrandListService,
    CategoryListService,
    SliderListService,
    ListByService,
    ListByCategoryService,
    ListByRemarkService,
    ListBySmilierService,
    ProductDetailService,
    ListByKeywordService
};