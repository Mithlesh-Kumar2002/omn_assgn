const mongoose= require("mongoose");

const carSchema= new mongoose.Schema({
    uuid:{
        type: String
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    car_name:{
        type: String,
        required: true
    },
    car_model:{
        type:String,
        required:true
    },
    description:{
        type: String
    },
   
    images:{
        type:Array
    },
    quantity:{
        type: Number
    },
    
    
    

    
},{timestamps:true})
const CarModel = mongoose.model('Car', carSchema);

module.exports = CarModel;