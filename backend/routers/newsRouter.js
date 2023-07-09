import express from "express";
import expressAsyncHandler from "express-async-handler";
import dotenv from "dotenv";
import fetch from "node-fetch";
import cron from "node-cron";
import { v4 as uuidv4 } from "uuid";
import { TOPICS } from "../utils.js";
import { query } from "../db/db.js";

dotenv.config();
const newsRouter = express.Router();

const host = process.env.NEWS_HOST;
const apikey = process.env.NEWS_API;
const feedly = process.env.FEEDLY_HOST;
const newsPerPage = process.env.NEWS_PER_PAGE;

// Cron job to fetch news from home every hour.
cron.schedule("0 * * * *", async () => {
  try {
    const url = `${host}top-headlines?country=us&apiKey=${apikey}&pageSize=30`;
    const response = await fetch(url);
    const data = await response.json();

    // Update table with the most recent news.
    await query("TRUNCATE news");
    const q =
      "INSERT INTO news(author, title, description, url, urlToImage, publishedAt, content, topic) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)";

    await Promise.all(
      data.articles.map(async (d) => {
        await query(q, [
          d.author,
          d.title,
          d.description,
          d.url,
          d.urlToImage,
          d.publishedAt,
          d.content,
          "home",
        ]);
      })
    );

    // Update all other topics as well.
    // Get all top headline news with different topics
    await Promise.all(
      TOPICS.map(async (topic) => {
        const url = `${host}top-headlines?country=us&category=${
          topic === "world" ? "general" : topic
        }&apiKey=${apikey}&pageSize=${newsPerPage}`;
        const response = await fetch(url);
        const data = await response.json();

        await Promise.all(
          data.articles.map(async (d) => {
            await query(q, [
              d.author,
              d.title,
              d.description,
              d.url,
              d.urlToImage,
              d.publishedAt,
              d.content,
              topic,
            ]);
          })
        );
      })
    );
  } catch (error) {
    throw error;
  }
});

newsRouter.get(
  "/home",
  expressAsyncHandler(async (req, res) => {
    try {
      const url = `${host}top-headlines?country=us&apiKey=${apikey}&pageSize=30`;
      const response = await fetch(url);
      const data = await response.json();

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
      }&apiKey=${apikey}&pageSize=${newsPerPage}`;
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
    const { source } = req.body;

    try {
      const url = `${host}top-headlines?sources=${encodeURIComponent(
        source
      )}&apiKey=${apikey}&pageSize=${newsPerPage}`;
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
