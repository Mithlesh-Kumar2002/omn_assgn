const mongoose = require("mongoose")
// const books= require("./books.model")
const userSchema = new mongoose.Schema(
  {
   
    name: {
      type: String,
     
      trim: true,
    },
    email: {
      type: String,
     
      trim: true,
    },
   
    address:{
        type:String

    },

    password: {
      type: String,
    
    },
   
    active: {
      type: Boolean,
      default: true,
    },
   
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
     
      ref: "user",
    },
    phone:{
        type:Number

    },
   
    token: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    image: {
      type: String,
    },
    gender:{
        type:String,
    }
   

  },
  { timestamps: true }
)

module.exports = mongoose.model("user", userSchema)