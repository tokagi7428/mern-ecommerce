import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { isAuth, generateToken } from "../utils.js";

const userRouter = express.Router();

// Signin
userRouter.post("/signin", (req, res) => {
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (email === "" || password === "") {
    res.json({
      status: "FAILED",
      message: "Empty credentials supplied",
    });
  } else {
    // Check if user exist
    User.find({ email })
      .then((data) => {
        if (data.length) {
          // User exists

          const hashedPassword = data[0].password;
          bcrypt
            .compare(password, hashedPassword)
            .then((result) => {
              if (result) {
                // Password match
                res.json({
                  status: "SUCCESS",
                  message: "Signin successful",
                  data: data,
                });
              } else {
                res.json({
                  status: "FAILED",
                  message: "Invalid password entered!",
                });
              }
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "An error occurred while comparing passwords",
              });
            });
        } else {
          res.json({
            status: "FAILED",
            message: "Invalid credentials entered!",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: "FAILED",
          message: "An error occurred while checking for existing user",
        });
      });
  }
});

userRouter.post(
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

export default userRouter;
