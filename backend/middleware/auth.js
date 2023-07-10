import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  const auth = req.headers.authorization;

  if (auth) {
    const token = auth.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: "Invalid Token." });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    return res.status(401).send({ message: "No Token." });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res
      .status(401)
      .send({ message: "Invalid: You do not have access." });
  }
};
