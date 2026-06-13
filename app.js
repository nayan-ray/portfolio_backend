import express from 'express';

import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from "url";
import helmet from "helmet";

import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean"
import { errorResponse } from './src/helper/response.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet())
app.use(mongoSanitize());
app.use(xss());

app.get('/', (req, res) => {
    res.send('Hello World!');
});



//client error handling
app.use((req,res,next)=>{
     next(createError(404,"router not found"))
    })



//server error handling
app.use((error,req,res,next)=>{
  
    return errorResponse(res,{
        statusCode :error.status,
        message : error.message,
    })
 })


export default app;