import express from 'express'
import User from '../model/user.js';


import authuser from '../middleware/Auth.js'
const profileRouter=express.Router();
profileRouter.patch('/update', async (req, res) => {

    const allowedUpdate = ["emailId", "salary", "skills", "gender"]
    const bool = Object.keys(req.body).every((key) => { return allowedUpdate.includes(key) });
    if (!bool) {
        return res.status(400).send("update is not allowed")
    }
    const { emailId } = req.body;
    await User.findOneAndUpdate({ emailId }, req.body, { runValidators: true })
    res.send("successfully updated")
})

profileRouter.get('/feed', async (req, res) => {
    try {
        const users = await User.find({});


        res.send(users);
    }
    catch (error) {
        res.send(error);
    }
})


profileRouter.get('/profile', authuser, (req, res) => {
    res.send(req.user);
})
export default profileRouter