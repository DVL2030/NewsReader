import express from "express";
import expressAsyncHandler from "express-async-handler";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const newsRouter = express.Router();

const host = process.env.NEWS_HOST;
const apikey = process.env.NEWS_API;

const feedly = process.env.FEEDLY;

newsRouter.get(
  "/home",
  expressAsyncHandler(async (req, res) => {
    try {
      const url = `${host}top-headlines?country=us&apiKey=${apikey}&pageSize=30`;

      const response = await fetch(url);
      const data = await response.json();
      return res.status(201).send(data.articles);
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

newsRouter.post(
  "/topic",
  expressAsyncHandler(async (req, res) => {
    try {
      const url = `${host}top-headlines?country=us&apiKey=${apikey}&`;
      const response = await fetch(url);
      const data = await response.json();
      return res.status(201).send(data);
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

newsRouter.post(
  "/source",
  expressAsyncHandler(async (req, res) => {
    try {
      const url = `${host}top-headlines?country=us&apiKey=${apikey}`;
      const response = await fetch(url);
      const data = await response.json();
      return res.status(201).send(data);
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

export default newsRouter;
