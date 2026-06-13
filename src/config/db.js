import mongoose from 'mongoose';

import 'dotenv/config'
import { Mongo_connect_url } from '../../secret.js';

export const connectDb = async ()=>{
   try {
    await  mongoose.connect(Mongo_connect_url);
    console.log("database connected successfully");
   
   } catch (error) {
      console.log(error.message);
      
   }


}