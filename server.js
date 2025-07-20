import express from 'express'

import connectDb from './src/config/database.js';
const app=express();
import User from './src/model/user.js';
app.post("/signup",async (req,res)=>{
    const userObj={
        firstName:"ajay",
        lastname:"Singh",
        emailId:"ajaysinghajnd",
        password:"singhajay9968"

    }
    try {
    const user =new User(userObj);
    await user.save();
     res.send("user added succesfully")
    }
    catch (error){
        res.status(400).send("error saving the user"+error.message)
    }
  
   
})




connectDb().then(()=>{
    console.log("db successfully connected")
    app.listen(8000,()=>{console.log("the server is running")})
}).catch((error)=>{
    console.log(error.message)

})


