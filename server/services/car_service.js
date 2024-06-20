const carModel = require("../models/car_model");
const path = require("path");
const CustomError = require("../utils/error");
exports.add_new_car = async ({
  car_name,
  description,
  car_model,
  quantity,
  id,
  files,
}) => {
  try {
    console.log("PPPPPPPPPPPPPPPPP", car_name);
    console.log("BBBBBBBBBBBBBBBB", files);
    console.log("CArrrrrrrrrr", car_name);
    const images = files?.map((file) => file.path);
    const car = await carModel.create({
      car_name: car_name,
      user: id,
      description: description,
      images: images,
      car_model: car_model,
      quantity: quantity,
    });
    return { car };
  } catch (error) {
    console.log(error);
    return error;
  }
};
exports.get_cars = async (payload) => {
  // const { userId } = payload.params;
  // console.log(userId);
  try {
    console.log("dsds", payload.query);
    const page = payload.query.page || 1;
    const pageSize = payload.query.pageSize || 3;
    const skip = (page - 1) * pageSize;

    const cars = await carModel.find().sort({ createdAt: -1 });
    // .skip(skip)
    // .limit(pageSize);;
    console.log("cars: ", cars);
    const totalCars = await carModel.countDocuments();

    return { cars, totalCars, page, pageSize };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
exports.get_car = async (payload) => {
  try {
    const { carId } = payload.params;

    const car = await carModel.findById(carId);

    if (!car) {
      throw new CustomError("car not found", 404);
    }

    return car;
  } catch (error) {
    throw error;
  }
};

exports.update_car = async (payload) => {
  try {
    const carId = payload.params.carId;
    const car_name = payload.body.carName;
    const description = payload.body.description;
    const car_model = payload.body.carModel;
    const quantity = payload.body.quantity;

    console.log("Updating car with ID:", carId);
    console.log("Payload params:", payload.params);
    console.log("Payload body:", payload.body);
    const car = await carModel.findById(carId);
    if (!car) {
      throw new CustomError("Car not found", 404);
    }

    if (car_name) {
      car.car_name = car_name;
    }
    if (description) {
      car.description = description;
    }
    if (car_model) {
      car.car_model = car_model;
    }
    if (quantity) {
      car.quantity = quantity;
    }

    console.log("Update data:", car);

    const updatedCar = await car.save();

    console.log("Updated car:", updatedCar);
    return updatedCar;
  } catch (error) {
    console.log("Error updating car:", error);
    throw error;
  }
};

exports.delete_car = async (payload) => {
  try {
    const { carId } = payload.params;

    console.log("PAAA", payload.params);
    const deleted = await carModel.findByIdAndDelete(carId);
    console.log("DDDDDDDDEEEEE");
    return deleted;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
