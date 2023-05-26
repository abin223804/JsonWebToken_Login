require("dotenv").config();
require("./config/db").connect();
const express = require("express");
const cookie=require("cookieparser")

const app = express();
const path=require("path");
const userroute = require("./routes/userroute.js");

//view engine setup
app.set('view',path.join(__dirname,'views/user'));
app.set('view engine',"ejs");
app.use("/", userroute);
app.use("/user", userroute);
app.use(cookie)



app.use(express.json({ limit: "50mb" }));
app.use("*",(req,res)=>{
    res.status(404).json({
        success:"false",
        message:"page not found",
        error:{
            statusCode:404,
            message:"you reached a route that is not defined on this server",
        },
    });
});

const port = 4000;
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
