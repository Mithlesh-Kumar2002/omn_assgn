const {user_model} = require("../models");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const customError = require("../utils/error");
const bcrypt = require("bcrypt");
exports.register = async (payload) => {
  try {
    const {name,  email, password, confirm_password } = payload.body;
    console.log(payload.body);
    console.log("pasds",payload.body);
    const existingUser = await user_model.findOne({ email });

    if (existingUser) {
      throw new customError("User all ready exists", 409);
    }
    if (!name || !email || !password || !confirm_password) {
      throw new customError("All fields are required", 403);
    }
    if(password !==  confirm_password){
        throw new customError("Password and Confirm password is  not  mattched",402)
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await user_model.create({
      
      email,
      password: hashedPassword,
      name:name,
    });
    return { user };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
exports.login = async (payload,res) => {
    try {
        const { email, password } = payload.body;
        if (!email || !password) {
          return res.status(400).json({
            success: false,
            message: `Please Fill up All the Required Fields`,
          });
        }
        const user = await user_model.findOne({ email })
          .populate("additionalDetails")
          .exec();
        if (!user) {
          throw Object.assign(new Error(), {
            name: "INVALIDUSER",
            message: "User Not  Exists!",
          });
        }
        const isCorrectPassword = bcrypt.compareSync(password, user.password);
        if (!isCorrectPassword) {
          throw Object.assign(new Error(), {
            name: "INVALIDPASSWORD",
            message: "Wrong Password",
          });
        } 
        else{
          const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            {
              expiresIn: "24h",
            }
          );
          user.token = token;
          user.password = undefined;
          const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
          };
          // res.cookie("token", token, options).status(200).json({
          //   success: true,
          //   token,
          //   user,
          //   message: `User Login Success`,
          // });
          return  {user,token}
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
  
};