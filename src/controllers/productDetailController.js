import ProductDetails from "../model/productDetailsModel";

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

export { createProductDetails };
