const express=require("express");
const userroute = express();
const userController=require("../controller/userController");
const auth=require("../middleware/auth");


userroute.set("views","./views/user");
userroute.use(express.json());
userroute.use(express.urlencoded({ extended:true }));
userroute.get("/",userController.loadsignup);
userroute.get("/signup",userController.loadsignup);
userroute.post("/signup",userController.storesignup);
userroute.get("/login",userController.loadlogin);
userroute.post("/login",userController.storelogin);
userroute.get("/welcome",auth,userController.welcome);





module.exports = userroute;