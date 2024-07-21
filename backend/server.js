const express = require("express");
const app = express();

const mongoose=require('mongoose')

const dotenv=require('dotenv');
dotenv.config();
app.use(express.json()) 
const cors=require('cors');
app.use(cors());
const userRouter=require('./routes/userRoutes')

mongoose.connect(process.env.URI).then(()=>{
    console.log("Connected Sucessfully");
    app.listen(process.env.PORT || 8000 , (err)=>{
        if(err) console.log(err);
        console.log("Server Running at Port",process.env.PORT);
    });
}).catch((error)=>{
    console.log("error in connection "+ error)
})

app.use(userRouter);




