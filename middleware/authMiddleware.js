const { verifyToken } = require("../utils/utils");

exports.authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ error: "Access denied, no token provided." });

  try {
    const decoded = utils.verifyToken(token);
    req.userId = decoded.id; // Attach user ID to request
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(403).json({ error: "Invalid or expired token." });
  }

};
