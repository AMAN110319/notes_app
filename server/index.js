require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require('./routes/userRouter')
const noteRouter=require("./routes/noteRouter");
const path=require('path');
const app = express();


const PORT =8000||process.env.PORT;

// Middlewares 
app.use(express.json()); 
app.use(cors());

// routes
app.use('/users',userRouter);
app.use('/api/notes',noteRouter);

// using the build app
app.use(express.static(path.join(__dirname,"../client/build")))

// render client for any path

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../client/build/index.html"));
});


// Connection to MongoDB
mongoose.connect("mongodb+srv://amantiwari:tiwari0505@cluster0.7i9mdzt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("connection successful")
    
}).catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
});

app.listen(PORT, () => {
    console.log(`App listening at ${PORT}`);
});
