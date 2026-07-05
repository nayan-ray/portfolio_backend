import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name : { type: String, required: true },
    email : {
         type: String,
         unique: true,
         required : [true, "Email is required"],
         validate : {
            validator : (v)=>{
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

            },
            message : props => `${props.value} is not a valid email`
         }
        },
   
    password : {
        type: String,
        trim : true,
        required : [true, "Password is required"],
       

    },
  },

{timestamps : true, versionKey : false}
)

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;