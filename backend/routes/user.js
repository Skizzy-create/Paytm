const express = require("express");
const { validateUserSingUp, validateUserLogin } = require("../middlewares/validators");
const { UserModel } = require("../database/db");
const { generateToken } = require("../auth/authOps");
const router = express.Router();


router.post('/signup', validateUserSingUp, async (req, res) => {
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  try {
    const existingUser = await UserModel.findOne({
      username: username
    });

    if (existingUser) {
      return res.status(411).json({
        msg: "UserName already taken"
      });
    }

    const newUser = await UserModel.create({
      userName: username,
      firstName: firstName,
      lastName: lastName,
      password: password
    });

    const token = generateToken(newUser, res);
    if (!token) {
      await UserModel.deleteOne({
        username: username
      });
      console.log("User deleted -- Error generating JWT token -- post signup");

      return res.status(500).json({
        msg: "Error creating user"
      });
    }

    res.status(200).json({
      msg: "User Created Sucessfylly",
      token: token
    });

  } catch (err) {
    console.log("Server Error: SingUp Route");
    return res.status(411).json({
      msg: "SERVER ERROR -- SINGUP ROUTE",
      error: err
    });
  }

});


router.post('/login', validateUserLogin, async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const existingUser = await UserModel.findOne({
      $and: [
        { userName: username },
        { password: password }
      ]
    });

    // console.log("Existing User: ", existingUser); for debugging only

    if (existingUser === null) {
      return res.status(411).json({
        msg: "User not found / Credentials Incorrect"
      });
    }

    const token = generateToken(existingUser, res);
    if (token === false) {
      console.log("Error generating JWT token -- post login");
      return res.status(500).json({
        msg: "Error logining user",
        token: token
      });
    }

    return res.status(200).json({
      msg: "User Logged In Sucessfully",
      token: token
    });

  } catch (err) {

    console.log("Server Error: Login Route");

    return res.status(411).json({
      msg: "SERVER ERROR -- LOGIN ROUTE",
      error: err
    });

  }
});

module.exports = router;
