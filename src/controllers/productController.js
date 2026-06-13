import { successResponse } from "../helper/response.js";
import Product from "../model/productModel.js";

const createProduct = async (req, res, next)=>{

    const { productName } = req.body;

    try {
        let productObj={ productName };
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

export { createProduct };