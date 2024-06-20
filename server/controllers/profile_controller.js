const { update_user_profile_service } = require("../services");
exports.update_user_profile = async (req, res) => {
  try {
    console.log("user update",req.body)
    const response = await update_user_profile_service.update_user_profile(req);
    res.status(200).json(response);
  } catch (error) {
    console.log("update user error")
    console.log(error);
    res.status(500).json(error);
  }
};
exports.allUser = async (req, res) => {
  try {
    const response = await update_user_profile_service.allUser(req);
    res.status(200).json({
      success: true,
      userData: response,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getUser = async (req, res) => {
  try {
    const response = await update_user_profile_service.get_user(req);
    if (response == "User Not Found") {
      return res.status(400).json({ response });
    } else {
      return res.status(201).json({ response });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
