import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";
import { isAuth } from "../middleware/auth.js";
import { query } from "../db/db.js";

const userRouter = express.Router();

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    // const user = await User.findOne({ email: req.body.email });
    const result = await query("SELECT * FROM users WHERE email = $1", [
      req.body.email,
    ]);
    if (result) {
      const user = result[0];
      if (bcrypt.compareSync(req.body.password, user.password)) {
        return res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
      } else {
        return res.status(401).send({ message: "Password is not correct." });
      }
    } else {
      return res.status(401).send({
        message: `No user with email ${req.body.email} has been found.`,
      });
    }
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const { name, email, password: plainTextPassword } = req.body;
    const password = bcrypt.hashSync(plainTextPassword);

    const result = await query(
      "SELECT COUNT(*) as count FROM users email = $1",
      [email]
    );
    const count = result[0].count;
    if (count > 0) {
      return res.status(401).send({
        status: "error",
        message:
          "A user with that email has already registered. Please use a different email..",
      });
    }

    try {
      await query("INSERT INTO users(name,email,password) VALUES($1,$2,$3)", [
        name,
        email,
        password,
      ]);

      res.status(201).send({
        message:
          "You have successfully create account. You will be redirected to home page soon..",
      });
    } catch (error) {
      return res.status(401).send({
        message: "There was an error ",
      });
    }
  })
);
export default userRouter;
