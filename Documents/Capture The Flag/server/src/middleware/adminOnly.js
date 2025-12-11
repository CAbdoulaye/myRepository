export const adminOnly = (req, res, next) => {
  try {
    // verifyToken MUST run before adminOnly
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    next(); // User is admin → continue
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
