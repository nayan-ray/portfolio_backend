import express from 'express';

import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from "url";
import helmet from "helmet";

import xss from "xss";
import { errorResponse } from './src/helper/response.js';
import productRoute from './src/route/productRoute.js';
import productDetailsRoute from './src/route/productDetailsRoute.js';
import authRoute from "./src/route/authRoute.js"


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet())

const sanitizeInput = (value) => {
    if (typeof value === 'string') return xss(value);
    if (Array.isArray(value)) {
        return value.map((item) => sanitizeInput(item));
    }
    if (value && typeof value === 'object') {
        Object.entries(value).forEach(([key, item]) => {
            value[key] = sanitizeInput(item);
        });
        return value;
    }
    return value;
};

app.use((req, _res, next) => {
    if (req.body && typeof req.body === 'object') sanitizeInput(req.body);
    if (req.query && typeof req.query === 'object') sanitizeInput(req.query);
    if (req.params && typeof req.params === 'object') sanitizeInput(req.params);
    next();
});

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!');
});
//api routes
app.use("/api/v1/portfolio", productRoute)
app.use("/api/v1/portfolio", productDetailsRoute)
app.use("/api/v1/portfolio", authRoute)


//client error handling
app.use((req,res,next)=>{
     next(createError(404,"router not found"))
    })



//server error handling
app.use((error,req,res,next)=>{
    if(error.code == "LIMIT_FILE_SIZE"){
        error = createError(400,'File size is too large. Maximum limit is 2MB')
    }
    if(error.code == "ENOENT" ){
        error = createError(404,'File not found')
    }
//   console.log(error)
    return errorResponse(res,{
        statusCode :error.status,
        message : error.message,
    })
 })


export default app;