import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcryptJs from "bcryptjs";
import bcrypt from "bcrypt";
import { isAuth, generateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const user = await User.find({});
  res.send(user);
});

// Signin
userRouter.post("/signin", async (req, res) => {
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (email == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty credentials supplied",
    });
  } else {
    // Check if user exist
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcryptJs.compareSync(req.body.password, user.password)) {
        res.json({
          status: "SUCCESS",
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            dateOfBirth: user.dateOfBirth,
            isAdmin: user.isAdmin,
            token: generateToken(user),
          },
        });
        return;
      }
    }
    res.json({
      status: "FAILED",
      message: "Invalid email or password",
    });
  }
});

// Signup
userRouter.post("/signup", async (req, res) => {
  let { name, email, password, dateOfBirth } = req.body;
  name = name.trim();
  email = email.trim();
  password = password.trim();
  dateOfBirth = dateOfBirth.trim();

  if (name === "" || email === "" || password === "" || dateOfBirth === "") {
    res.json({
      status: "FAILED",
      message: "Empty input fields!",
    });
  } else if (!/^[a-zA-Z ]*$/.test(name)) {
    res.json({
      status: "FAILED",
      message: "Invalid name",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: "FAILED",
      message: "Invalid email",
    });
  } else if (!new Date(dateOfBirth).getTime()) {
    res.json({
      status: "FAILED",
      message: "Invalid date of birth",
    });
  } else if (password.length < 6) {
    res.json({
      status: "FAILED",
      message: "Password is too short!",
    });
  } else {
    // Checking if user already exists
    const userCheck = await User.findOne({ email: req.body.email });
    if (userCheck) {
      res.json({
        status: "FAILED",
        message: "Email has registed",
      });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        password: bcryptJs.hashSync(req.body.password),
      });
      const user = await newUser.save();
      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      };
      res.json({
        status: "SUCCESS",
        message: "Signin successful",
        data: data,
      });
      return;
    }
  }
});

export default userRouter;
