const express = require("express");
const { validateUserSingUp, validateUserLogin, validateUserInfoUpdate } = require("../middlewares/validators");
const { UserModel } = require("../database/db");
const { generateToken, hashedPassword, checkPassword } = require("../auth/authOps");
const { authenticateToken } = require("../auth/auth");
const { authMiddleware } = require("../middlewares/middlewares");
const router = express.Router();


router.post('/signup', validateUserSingUp, async (req, res) => {
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  try {
    const existingUser = await UserModel.findOne({
      userName: username
    });

    if (existingUser) {
      console.log("UserName already taken");
      return res.status(411).json({
        msg: "UserName already taken"
      });
    }
    const hPssword = await hashedPassword(password);

    const newUser = await UserModel.create({
      userName: username,
      firstName: firstName,
      lastName: lastName,
      password: hPssword
    });

    const token = generateToken(newUser, res);
    if (!token) {
      await UserModel.deleteOne({
        userName: username
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
    console.log("Server Error: SingUp Route \nError: " + err);
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
        // { password: password }
      ]
    });

    // console.log("Existing User: ", existingUser); for debugging only

    if (existingUser === null) {
      return res.status(411).json({
        msg: "User not found / Credentials Incorrect",
        validation: false
      });
    }

    const isValid = await checkPassword(password, existingUser.password);
    console.log(isValid);
    if (!isValid) {
      return res.status(403).json({
        msg: "Invalid Credentials/ Wrong data",
        validation: false
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
    console.log("Server Error: Login Route\nError: ", err);

    return res.status(411).json({
      msg: "SERVER ERROR -- LOGIN ROUTE",
      error: err
    });

  }
});

router.put('/', validateUserInfoUpdate, authenticateToken, authMiddleware, async (req, res) => {
  const newBody = req.body;
  const id = req.user.id;
  const id2 = req.user.id;
  console.log("Id from token = ", id);
  console.log("Id from header = ", id2);
  try {
    const existingUser = await UserModel.findById(id); // Use findById for MongoDB _id

    if (!existingUser) {
      console.log("No user found with ID: ", id);
      return res.status(411).json({
        msg: "Invalid Credentials/ Wrong data",
        validation: false
      });
    }
    let hPassword = null;
    if (req.body.password) {
      hPassword = await hashedPassword(req.body.password)
    };
    newBody.password = hPassword;
    const updatedUser = await UserModel.updateOne(
      { _id: id },
      { $set: newBody } // Corrected: use $set to update fields
    );

    if (!updatedUser.acknowledged) {
      console.log("User Update Failed");
      console.log(updatedUser);
      return res.status(411).json({
        msg: "User Update Failed",
      });
    }

    console.log("User Updated Successfully");
    return res.status(200).json({
      msg: "User Updated Successfully",
      user: updatedUser
    });

  } catch (err) {
    console.log("SERVER ERROR -- USER INFO UPDATE ROUTE\n", err);
    return res.status(500).json({
      msg: "SERVER ERROR -- USER INFO UPDATE ROUTE",
      error: err
    });
  }
});

router.get('/bulk', authenticateToken, authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  // console.log("filter = " + filter);
  try {
    let users = [];
    if (filter) {
      users = await UserModel.find({
        $or: [{
          firstName: {
            "$regex": filter
          }
        }, {
          lastName: {
            "$regex": filter
          }
        }]
      });
    } else {
      users = []; // Return an empty array or handle as needed when no filter is provided
    }
    // console.log("Users found:", users);

    res.json({
      user: users.map(user => ({
        username: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
      }))
    });
  } catch (err) {
    console.log("SERVER ERROR -- USER INFO UPDATE ROUTE\n", err);
    return res.status(500).json({
      msg: "SERVER ERROR -- USER INFO UPDATE ROUTE",
      error: err
    });
  }
});


module.exports = router;