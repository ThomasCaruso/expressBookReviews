const express = require("express");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const customerRoutes = require("./router/auth_users.js").authenticated;
const generalRoutes = require("./router/general.js").general;

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "access";

app.use(express.json());

app.use(
  "/customer",
  session({
    secret: process.env.SESSION_SECRET || "fingerprint_customer",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: "lax" }
  })
);

app.use("/customer/auth", (req, res, next) => {
  const sessionAuthorization = req.session?.authorization;
  const bearerToken = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice(7)
    : null;
  const accessToken = bearerToken || sessionAuthorization?.accessToken;

  if (!accessToken) {
    return res.status(401).json({ message: "Authentication required." });
  }

  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    req.session.authorization = {
      accessToken,
      username: decoded.username
    };
    return next();
  } catch (_error) {
    return res.status(401).json({ message: "Invalid or expired access token." });
  }
});

app.use("/customer", customerRoutes);
app.use("/", generalRoutes);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
