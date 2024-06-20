const {auth_service}= require("../services")

exports.signup = async (req, res) => {
  try {
    const response = await auth_service.register(req);
    return res.status(200).json({
      message: "Signup successfull",
      user: response.user,
    });
  } catch (error) {
    console.log(error);
     
  }
};
exports.login = async (req, res) => {
    console.log("respomnse login controller")
    try {
        const response = await auth_service.login(req);
        console.log("response",response);
          return res.status(200).json({response});
      } catch (error) {
        if (error.name === "INVALIDUSER") {
          return res.status(401).json({
            success: false,
            message: error.message,
          });
        }
        if (error.name === "INVALIDPASSWORD") {
          return res.status(401).json({
            success: false,
            message: error.message,
          });
        }
      }
  };
  