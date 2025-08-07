import express from 'express'
import validatesignupdata from '../utils/validator.js'
import User from '../model/user.js'
import bcrypt from 'bcrypt'
const authRouter =express.Router();

import jwt from 'jsonwebtoken'
authRouter.post("/signup", async (req, res) => {


    try {

        validatesignupdata(req);
        const { password, emailId, firstName, lastName } = req.body;
        const hashedpassword = await bcrypt.hash(password, 10);
        const obj = {
            firstName, lastName, emailId, password: hashedpassword
        }
        const bool = await bcrypt.compare(password, hashedpassword)
        console.log(bool)
        console.log(hashedpassword)
        const user = new User(obj)
        await user.save();

        res.send("user added succesfully")
    }
    catch (error) {
        res.status(400).send("error saving the user" + error.message)
    }


})


authRouter.post('/login', async (req, res) => {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    try {
        if (!user) {
            throw new Error("user is not present")
        }
        //we have to use await here because the asyncronous function immediate give promise as response and then when the call stack it empty then it will run the function in fucntion when it return value then the function resolved
        const isPassportvalid = await user.comparePassword(password);
       console.log(isPassportvalid)
        if (isPassportvalid) {
            const token = user.getjwt();

            res.cookie("token", token, { httpOnly: true, secure: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
            return res.send("loggen in successfull");
        }
        else {
            throw new Error("Incorrect password")
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }

})

authRouter.post('/logout',async(req,res)=>{
    res.cookie('token',null,{expires:new Date(Date.now())});
    res.send("cookie sent seccussfullt")
})

export default authRouter



