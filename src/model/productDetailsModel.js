import mongoose from "mongoose";

const productDetailsSchema = new mongoose.Schema({
    goal : { type: String, required: true, unique: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    status :{type : String, required : true},
    tools: { type: String, required: true },
    visitLink: { type: String, required: true },
    usage: { type: String, required: true },
    productId : { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }
    
}, {timestamps : true, versionKey : false});

const ProductDetails = mongoose.model("ProductDetails", productDetailsSchema);

export default ProductDetails;