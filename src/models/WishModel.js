const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    product_id: {type:mongoose.Schema.ObjectId, required:true},
    userId:{type:mongoose.Schema.ObjectId,required:true},
},{timestamps:true,versionKey:false});

const WishModel = mongoose.model('wishes', DataSchema);
module.exports = WishModel;