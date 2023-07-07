import express from "express";
import expressAsyncHandler from "express-async-handler";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";

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

      // create Id for Each entry because Id is not given by default.
      const newData = data.articles.map((d) => {
        let update = { ...d, source: { id: uuidv4(), name: d.source.name } };
        return update;
      });

      return res.status(201).send({ home: newData });
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
    const { topic } = req.body;
    try {
      const url = `${host}top-headlines?country=us&category=${
        topic === "world" ? "general" : topic
      }&apiKey=${apikey}&pageSize=60`;
      const response = await fetch(url);
      const data = await response.json();
      // create Id for Each entry because Id is not given by default.
      const newData = data.articles.map((d) => {
        let update = { ...d, source: { id: uuidv4(), name: d.source.name } };
        return update;
      });
      const json = {};
      json[topic] = newData;
      return res.status(201).send(json);
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
    const { topic } = req.source;
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
