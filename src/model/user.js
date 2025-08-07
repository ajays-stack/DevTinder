import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("email is not valid")
        }
    },
    unique:true,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    validate(value) {
      if (value === "female") {
        throw new Error("Females are not allowed");
      }
    }
  },
  skills:{
    type:[String]
  },
  salary:{
    type:Number,
  }
});
userSchema.methods.getjwt=function(){
  const user =this;
  const token= jwt.sign({_id:user._id},"ajay",{expiresIn:"1d"});
  return token;
}

userSchema.methods.comparePassword= async function(password){
  const user =this;
     const isPassportvalid = await bcrypt.compare(password, user.password);
  return isPassportvalid
}
const User = mongoose.model("User", userSchema);

export default User;
