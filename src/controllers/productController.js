import { successResponse } from "../helper/response.js";
import Product from "../model/productModel.js";

const createProduct = async (req, res, next)=>{

    const { productName } = req.body;
   
    try {
        let productObj={ productName };
        console.log(req.file + "fi")
        if(req.file){
             productObj. productImg  = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }

       const newProduct =  await Product.create(productObj);

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
            let productObj={ productName };
            if(req.file){
                 productObj. productImg  = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
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