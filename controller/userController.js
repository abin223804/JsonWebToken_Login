const User = require("../model/user");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie=require("cookieparser")


const loadsignup = (req, res) => {
  try {
    res.render("signup");
  } catch (error) {
    console.log(error.message);
  }
};

const loadlogin = (req, res) => {
  try {
    res.render("signin");
  } catch (error) {
    console.log(error.message);
  }
};
const storesignup = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All inputs required");
    }
    const olduser = await User.findOne({ email });
    if (olduser) {
      return res.status(409).send("user allready exist.please login");
    }
    const encryptedpassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email.toLowerCase(),
      password: encryptedpassword,
    });
    // console.log(first_name,last_name,email,encryptedpassword);
    const token = jwt.sign(
      {
        user_id: user.id,
        email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    user.password=undefined
      res.status(201).json(user);
    // res.render("success");
  } catch (error) {
    console.log(error);
  }
};

const storelogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("all inputs required");
    }
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          user_id: user.id,
          email,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      user.password=undefined;

     const options={
      expires:new Date(Date.now()+3*24*60*60*1000),
      httpOnly:true, 
     }


      res.status(200).cookie("token",token,options).json({
        success:true,
        token:token,
        user
      })
    }
   
  } catch (error) {
    console.log(error);
  }
} ;
const welcome=(req,res)=>{
    res.status(200).send("Welcome 🙌");
}



module.exports = {
  loadsignup,
  loadlogin,
  storesignup,
  storelogin,
  welcome,
};
