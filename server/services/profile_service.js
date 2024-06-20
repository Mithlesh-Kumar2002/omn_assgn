const { user_model } = require("../models");
const CustomError = require("../utils/error");
exports.update_user_profile = async (payload) => {
  try {
    console.log("Params:", payload.params);
    console.log("Body:", payload.body);

    const  id  = payload.params.userId;
    const { name, phone, address } = payload.body;
console.log("sdss",id);
    const user = await user_model.findById(id);
    if (!user) {
      throw new CustomError("User not found",404);
    }

    if (name) {
      user.name = name;
    }
    if (phone) {
      user.phone = phone;
    }
    if (address) {
      user.address = address;
    }

    const updatedUser = await user.save();
    console.log("Updated User:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

exports.allUser = async (payload) => {
  try {
    // const keyword = payload.query.search
    //   ? {
    //       $or: [
    //         { firstName: { $regex: payload.query.search, $options: "i" } },
    //         { email: { $regex: payload.query.search, $options: "i" } },
    //       ],
    //     }
    //   : {};
    // const users = await userModel.userModel
    //   .find(keyword)
    //   .find({ _id: { $ne: payload.user._id } });
    const users = await user_model.find();
    const userData = Promise.all(
      users?.map(async (user) => {
        return {
          user: { email: user.email, firstName: user.firstName },
          userId: user._id,
        };
      })
    );

    return userData;
  } catch (error) {
    throw error;
  }
};
exports.get_user = async (payload) => {
  console.log("get user service");
  const userId = payload.params?.id;
  const id = userId;
  console.log("userId", payload.params?.id);
  let user;
  try {
    user = await user_model.findById(userId);
    const count = user.connections ? user.connections.length : 0;
    if (!user) {
      return "User Not Found";
    } else {
      return { user, count };
    }
  } catch (error) {
    throw error;
  }
};
