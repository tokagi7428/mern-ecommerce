import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { isAuth, generateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.post(
  "/singin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          dateOfBirth: user.dateOfBirth,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

router.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    let { name, email, password, dateOfBirth, isAdmin } = req.body;
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
        message: "Invalid name entered",
      });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      res.json({
        status: "FAILED",
        message: "Invalid email entered",
      });
    } else if (!new Date(dateOfBirth).getTime()) {
      res.json({
        status: "FAILED",
        message: "Invalid date of birth entered",
      });
    } else if (password.length < 8) {
      res.json({
        status: "FAILED",
        message: "Password is too short!",
      });
    } else {
      // Checking if user already exists
      User.find({ email })
        .then((result) => {
          if (result.length) {
            // A user already exists
            res.json({
              status: "FAILED",
              message: "User with the provided email already exists",
            });
          } else {
            const newUser = new User({
              name,
              email,
              isAdmin,
              dateOfBirth,
              password: bcrypt.hashSync(password),
            });
            const user = newUser.save();
            res.send({
              _id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              dateOfBirth: user.dateOfBirth,
              token: generateToken(user),
            });
          }
        })
        .catch((err) => {
          console.log(err);
          res.json({
            status: "FAILED",
            message: "An error occurred while checking for existing user!",
          });
        });
    }
  })
);
