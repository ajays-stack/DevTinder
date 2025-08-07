import express from 'express'

import connectDb from './src/config/database.js';

import cookieParser from 'cookie-parser'
import authRouter from './src/routes/auth.js'
import profileRouter from './src/routes/profile.js';
const app = express();
app.use(express.json());


app.use(cookieParser());


app.use('/',authRouter)

app.use('/',profileRouter)




connectDb().then(() => {
    console.log("db successfully connected")
    app.listen(8000, () => { console.log("the server is running") })
}).catch((error) => {
    console.log(error.message)

})


