
import createError from "http-errors";
import Admin from "../model/admin.js";
import { SECRET_KEY } from "../../secret.js";
import { createToken } from "../helper/token.js";
import { successResponse } from "../helper/response.js";


const handleLogin =  async(req, res, next)=>{
    try {
        //taken email and password from req.body

        const { email, password } = req.body;
        //find user  by email

        const user = await Admin.findOne({ email });
        //if user is not found send error response
       console.log(user)
        if (!user) {
            throw createError(404,  "User not found");

        }

        //compare password
       const isMatch = await user.password === password;
   

        //check match 
        if (!isMatch) {

            throw createError(401, "Invalid password or email");
         
        }
        

        const admin = {name : user.name, email : user.email};
        // create  token
        const accessToken = createToken(admin, SECRET_KEY, "10m" ) 
          
        //set token in cookie
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 10, // 10 minutes
            secure: true,
            sameSite : "none",
            path : "/"
        })
       
        return successResponse(res,{
            statusCode  : 200,
            message  : 'user login successfully',
            payload : admin
        })
        
    } catch (error) {
        next(error)
    }
  
}

const handleLogout =  async(req, res, next)=>{
    try {
        
        //clear  cookie
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: true,
            sameSite : "none",
            path : "/"
        });

        return successResponse(res,{
            statusCode  : 200,
            message  : 'user logout successfully',
            payload : {
                        
            }
        })
        
    } catch (error) {
        next(error)
    }
  
}

export {handleLogin, handleLogout}