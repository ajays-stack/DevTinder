import jwt from 'jsonwebtoken';
import User from '../model/user.js';

const authuser = async (req, res, next) => {
  try {
    console.log("Cookies:", req.cookies);

    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("Authentication token missing");
    }

    const decoded = jwt.verify(token, "ajay"); // consider moving "ajay" to .env
    console.log("Decoded:", decoded);

    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).send("User not found");
    }

    req.user = user;
    next();

  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).send("Invalid token");
  }
};

export default authuser;
