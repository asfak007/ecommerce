import BrandModel from "../models/BrandModel";


const BrandListService= async ()=>{
      BrandModel.find();
}

module.exports = {BrandListService};