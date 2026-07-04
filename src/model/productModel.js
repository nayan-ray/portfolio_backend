import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName : { type: String, required: true, unique: true },
    productImg : {type : String, default:"", required : true},
    publicId : {type : String, required : true},
    
}, {timestamps : true, versionKey : false});

const Product = mongoose.model("Product", productSchema);

export default Product;