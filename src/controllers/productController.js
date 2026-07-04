import { successResponse } from "../helper/response.js";
import Product from "../model/productModel.js";
import { uploadImage } from "../helper/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";

const createProduct = async (req, res, next)=>{

    const { productName } = req.body;
   
    try {
        
        console.log(req.file + "fi")
        
       const result=await uploadImage(req.file.path);
        

       const newProduct =  await Product.create({
            productName: productName,
            productImg: result.secure_url,
            publicId: result.public_id
        });

        return successResponse(res,{
            statusCode  : 201,
            message  : 'Product created successfully' ,
            payload :  newProduct   
        })
        
    } catch (error) {
        next(error);
    }

}
const getAllProducts = async (req, res, next)=>{
    try {
        const products = await Product.find();
        return successResponse(res,{
            statusCode  : 200,
            message  : 'Products fetched successfully' ,
            payload :  products   
        })
    } catch (error) {
        next(error);
    }
}

const updateProduct = async (req, res, next)=>{
        const { id } = req.params;
        const { productName } = req.body;
        try {

       const product = await Product.findById(id);

        if(!product){

            return res.status(404).json({
                message:"Not found"
            });

        }



            let productObj={ productName };
            if(req.file){
                await cloudinary.uploader.destroy(product.publicId);
                const result = await uploadImage(req.file.path);
                productObj.productImg = result.secure_url;
                productObj.publicId = result.public_id;
            }
            const updatedProduct = await Product.findByIdAndUpdate(id, productObj, { new: true });
            return successResponse(res,{
                statusCode  : 200,
                message  : 'Product updated successfully' ,
                payload :  updatedProduct   
            })
        } catch (error) {
            next(error);
        }
}

const deleteProduct = async (req, res, next)=>{
    const { id } = req.params;
    try {

        const product = await Product.findById(id);

        if(!product){

            return res.status(404).json({
                message:"Not found"
            });

        }
        await cloudinary.uploader.destroy(product.publicId);
        await Product.findByIdAndDelete(id);
        return successResponse(res,{
            statusCode  : 200,
            message  : 'Product deleted successfully' ,
        })
    } catch (error) {
        next(error);
    }
}

export { createProduct, getAllProducts, updateProduct, deleteProduct };