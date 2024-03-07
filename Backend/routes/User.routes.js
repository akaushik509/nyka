const express = require("express");
const { UserModel } = require("../model/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = express.Router();

//User SignUp
userRouter.post("/register", async (req, res) => {
  const { name, avatar, email, password } = req.body;
  try {
    // Generate hash for the password
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        return res.status(500).json({ msg: "Something went wrong", error: err.message });
      }
      try {
        const user = new UserModel({ name, avatar, email, password: hash });
        await user.save();
        res.status(201).json({ msg: "New user has been registered" });
      } catch (error) {
        res.status(500).json({ msg: "Something went wrong", error: error.message });
      }
    });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong", error: error.message });
  }
});

//User Login
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    let token=jwt.sign({userID:user[0]._id},"userauth")
                    console.log(token)
                    res.send({"msg":"Logged In","token":token,"userName":user[0].name, "ProfilePic":user[0].imageUrl, "email": user[0].email, "address":user[0].address, "mobile":user[0].mobile})
                }else{
                    console.log("Wrong Credentials")
                    res.send({"msg":"Wrong Credentials"})
                }
            })
        }else{
            
        }
    }catch(err){
        res.send({"msg":"Something went wrong","Error":err})
    }
})

module.exports = {
  userRouter
};
