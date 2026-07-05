import jwt from "jsonwebtoken";
import createError from "http-errors";
import { SECRET_KEY } from "../../secret.js";



const isLoggedIn = async(req, res,  next) => {
    try {

        //taken token from cookies

        const accessToken = req.cookies.access_token;
     
         
        
       
        //verify token

        const  decoded = jwt.verify(accessToken, SECRET_KEY);
        // check if user is active


        if(!decoded){
            throw createError(401, 'Unauthorized, please login first');
        }
       
        //Not modifying req.body directly to avoid potential issues
        //You create a new object, not mutate req.body
        // req.body.student  = decoded.student;
        req.admin  = decoded;
       
        
        // next middleware
        next();
    } catch (error) {
        next(error)
    }
    
}

const isLoggedOut = async(req , res,  next) => {
    try {
        // taken token from cookies
        const accessToken = req.cookies.access_token;
        if(!accessToken) return next();
        // check if token is valid
        if (accessToken) {
            try {
                const  decoded = jwt.verify(accessToken, login_secret_key);
                if(decoded){
                    throw createError(401, 'Unauthorized, you are already logged in');
                }
            } catch (error) {
                return next();
            }
        }
    // finally next middleware
        next();
    } catch (error) {
        next(error)
    }
}

const isAdmin = async(req, res,  next) => {
    try {
        //accept token  from cookie

        const accessToken = req.cookies.access_token;

        //check  if token is valid

        if (!accessToken) {
            throw createError(401,  'Unauthorized, you are not logged in');
        }
        //decoded  token to get user

        const  decoded = jwt.verify(accessToken, secret_login_Key);
        //check decoded 
        if(!decoded){
            throw createError(401, 'Unauthorized, please login first');
        }
        //check if user is admin

        if(!decoded.user.isAdmin){
            throw createError(403, 'Forbidden, you are not an admin')
        }
        
        //finally next middleware
        next();
    } catch (error) {
        next(error)
    }
    
}

export { isLoggedIn, isLoggedOut, isAdmin };