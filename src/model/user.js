import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
        firsName:{
            type:String,
            require:true,
        },
        lastName:{
            type:String,

        },
        emailId:{
            type:String
        },
        password:{
            type:String
        },
        age:{
            type:Number
        },
        gender:{
            type:String
        }
})

const User=mongoose.model("User",userSchema)
export default User