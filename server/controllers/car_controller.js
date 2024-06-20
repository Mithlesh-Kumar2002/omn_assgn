const { car_service} = require("../services");
exports.add_new_car = async (req, res) => {
  try {

    console.log("cccccoooooooooooooo",req);
    const response = await car_service.add_new_car({  car_name:req.body.car_name,description:req.body.description,
      car_model:req.body.car_model,
      quantity:req.body.quantity,
      id:req.body.id,
      files:req.files});
    console.log("response caerrrrrrrrrt->>",response);
    console.log(response);
    return res.status(201).json({
      success: true,
      message: ` Added Successfully`,
      post: response.post,
    });
  } catch (error) {
    console.log("post creation error", error);
    res.status(500).send(error);
  }
};
exports.get_cars = async (req, res) => {
  try {
    const response = await car_service.get_cars(req);
    return res.status(200).json({response});
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};
exports.update_cars = async (req, res) => {
  try {
    
    const response = await car_service.update_car(req);
      
    console.log(response);    return res.status(200).json({response
      
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
exports.delete_car = async (req, res) => {
  try {
    const response = await car_service.delete_car(req);
    return res.status(202).json(response);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};
exports.get_car=async(req,res)=>{
  try{
    console.log("cccccccc")
    const response=  await car_service.get_car(req);
    return res.status(200).json({response});

  }
  catch(error){
    console.log(error);
  }
}