import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization); // Bearer XXXX
    if (err) {
      res.status(401).send({ message: "Invalid Token" });
    } else {
      req.user = decode;
      next();
    }
  } else {
    res.status(401).send({ message: "No Token" });
  }
};
