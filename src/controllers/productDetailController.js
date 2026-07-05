import mongoose from "mongoose";
import { successResponse } from "../helper/response.js";
import ProductDetails from "../model/productDetailsModel.js";

const createProductDetails = async (req, res, next) => {
    const { goal, type, description, tools, visitLink, usage, productId } = req.body;
       try {
        const productDetailObj={ goal, type, description, tools, visitLink, usage, productId };
        

       const newProductDetail =  await ProductDetails.create(productDetailObj);

        return successResponse(res,{
            statusCode  : 201,
            message  : 'Product detail created successfully' ,
            payload :  newProductDetail   
        })
        
    } catch (error) {
        next(error);
    }
}

//get product details by product id
const getProductDetailsByProductId = async (req, res, next) => {
    const { id } = req.params;   
     const productId = new mongoose.Types.ObjectId(id);
    try {
        const productDetails = await ProductDetails.aggregate([
            {
                $match: { productId: productId }
            },
            {
                $lookup :{
                    from : 'products',
                    localField : 'productId',
                    foreignField : '_id',
                    as : 'product'
                }
            },
            {
                $unwind : '$product'
            },
            {
                $project : {
                    "product.createdAt" : 0,
                    "product.updatedAt" : 0,
                }
            }
        ]);

        return successResponse(res,{
            statusCode  : 200,
            message  : 'Product details retrieved successfully' ,
            payload :  productDetails   
        })
    } catch (error) {
        next(error);
    }
}

//update product details by its own id
const updateProductDetails = async (req, res, next) => {
    const { id } = req.params;
   let newObject = {};

    try {
        
        if(req.body.goal){
            newObject.goal = req.body.goal
        }
        if(req.body.type){
            newObject.type = req.body.type
        }   
        if(req.body.description){
            newObject.description = req.body.description
        }
        if(req.body.tools){
            newObject.tools = req.body.tools
        }
        if(req.body.visitLink){
            newObject.visitLink = req.body.visitLink
        }
        if(req.body.usage){
            newObject.usage = req.body.usage
        }
        

        const updatedProductDetail = await ProductDetails.findByIdAndUpdate(
            id,
            newObject,
            { new: true }
        );

        return successResponse(res,{
            statusCode  : 200,
            message  : 'Product detail updated successfully' ,
            payload :  updatedProductDetail   
        })
    } catch (error) {
        next(error);
    }
}

//delete product details by its own id
const deleteProductDetails = async (req, res, next) => {
    const { id } = req.params;
    try {
        await ProductDetails.findByIdAndDelete(id);

        return successResponse(res,{
            statusCode  : 200,
            message  : 'Product detail deleted successfully' ,
        })
    } catch (error) {
        next(error);
    }
}


//delete all product details

const deleteAllProductDetails = async (req, res, next) => {
    try {
        await ProductDetails.deleteMany({});
        return successResponse(res,{
            statusCode  : 200,
            message  : 'All product details deleted successfully' ,
        })
    } catch (error) {
        next(error);
    }
}

export { createProductDetails, getProductDetailsByProductId, updateProductDetails, deleteProductDetails, deleteAllProductDetails };
