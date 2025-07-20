import mongoose from "mongoose";
const connectDb=async()=>{
   return await mongoose.connect('mongodb+srv://singhajay9968:Intruder9968@devtinder.1ocovsw.mongodb.net/DevTinder')

}


export default connectDb;