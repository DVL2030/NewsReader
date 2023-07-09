import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";
import { isAuth } from "../middleware/auth.js";
import { query } from "../db/db.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // const user = await User.findOne({ email: req.body.email });
    try {
      await query("DROP TABLE IF EXISTS users");
      await query(
        "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name varchar(30) NOT NULL, email varchar(255) NOT NULL, password varchar(100) NOT NULL, isAdmin boolean default false)"
      );
      await query(
        "INSERT INTO users(name, email, password, isAdmin) VALUES ('James', 'admin@outlook.com', $1, 'true')",
        [bcrypt.hashSync("123456", 8)]
      );
      await query(
        "INSERT INTO users(name,email, password) VALUES ('Clark', 'clark@outlook.com', $1)",
        [bcrypt.hashSync("123456", 8)]
      );
      await query(
        "INSERT INTO users(name,email, password) VALUES ('Ross', 'ross@outlook.com', $1)",
        [bcrypt.hashSync("123456", 8)]
      );
      return res.send({
        message: "Successfully created user table.",
      });
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

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
          id: user.id,
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
      "SELECT COUNT(*) as count FROM users WHERE email = $1",
      [email]
    );
    console.log(result);
    const count = result[0].count;
    if (count > 0) {
      return res.status(401).send({
        status: "error",
        message:
          "A user with that email has already registered. Please use a different email..",
      });
    }
    try {
      await query(
        "INSERT INTO users(name, email, password) VALUES ($1, $2, $3)",
        [name, email, password]
      );

      res.status(201).send({
        message:
          "You have successfully create account. You will be redirected to home page soon..",
      });
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);
export default userRouter;
