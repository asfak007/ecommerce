const mongoose = require("mongoose");

const DataSchema = mongoose.Schema({
        productId:{type:mongoose.Schema.ObjectId,required:true},
        userId:{type:mongoose.Schema.ObjectId,required:true},
        color:{type:String,required:true},
        price:{type:Number,required:true},
        qty:{type:Number,required:true},
        size:{type:Number,required:true}

},{timestamps:true,versionKey:false})

const CartModel = mongoose.model('carts',DataSchema)

module.exports = CartModel