const jwt = require("jsonwebtoken");
const keysecret = "jkhgftrdfvbcdsewrqaszlkjpoiuyblm";

const authenticaton = async (req, res, next) => {
  try {
    const token = await req.headers.authorization;
    // console.log(token);

    if (!token) {
      return res.status(401).json({ message: "You are not logged in" });
    } else {
      const verifyToken = await jwt.verify(token, keysecret);
      if (!verifyToken) {
        return res.status(403).json({ message: "Invalid Token" });
      } else {
        console.log(verifyToken);
      }
    }
  } catch (error) {
    res.status(400).json(`${error} not authenticate`);
  }
};

module.exports = authenticaton;
