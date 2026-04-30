const jwt = require("jsonwebtoken");
const student = require("../models/student");

const protect = async (req, res, next) => {
let token;

if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.student = await student.findById(decoded.userId).select("-password");
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  }else{
    res.status(401).json({ success: false, message: "Not authorized, no token" });
  }
  
}