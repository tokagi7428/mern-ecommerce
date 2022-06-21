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
        const data = {
          _id: user._id,
          name: user.name,
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
    res.json({
      status: "FAILED",
      message: "Invalid email or password",
    });
  }
});
