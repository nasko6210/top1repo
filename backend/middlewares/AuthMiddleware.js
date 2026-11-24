const { jwtVerify } = require("jose");
const secret=new TextEncoder().encode(process.env.JWT_SECRET || "importantsecret");

const validateToken = async (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) return res.status(401).json({ error: "User not logged in!" });

  try {
    const {payload} = await jwtVerify(accessToken, secret);
    req.user = payload;
    
      return next();
    
  } catch (error) {
    return res.status(4001).json({ error: "Invalid or expires token" });
  }
};
module.exports = { validateToken };
