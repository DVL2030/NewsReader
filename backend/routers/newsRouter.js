import express from "express";
import expressAsyncHandler from "express-async-handler";
import dotenv from "dotenv";
import cron from "node-cron";
import { TOPICS } from "../utils.js";
import { query } from "../db/db.js";
import {
  getNewsEntry,
  getTopicNews,
  insertNews,
} from "../services/newsService.js";
import {
  getFeedlyEntry,
  getStream,
  searchFeed,
} from "../services/feedlyService.js";

dotenv.config();
const newsRouter = express.Router();

// Cron job to fetch news from home every hour.
cron.schedule("0 * * * *", async () => {
  try {
    const url = `${process.env.NEWS_HOST}top-headlines?country=us&apiKey=${apikey}&pageSize=40`;
    const response = await fetch(url);
    const data = await response.json();

    // Reset serial sequence to 1.
    await query("SELECT setval('news_id_seq', 1, false)");

    // Update table with the most recent news.
    await query("TRUNCATE news");

    await Promise.all(
      data.articles.map(async (d) => {
        await insertNews(d, "home");
      })
    );

    // Update all other topics as well.
    // Get all top headline news with different topics
    await Promise.all(
      TOPICS.map(async (topic) => {
        const url = `${
          process.env.NEWS_HOST
        }top-headlines?country=us&category=${
          topic === "world" ? "general" : topic
        }&apiKey=${process.env.NEWS_API}&pageSize=${process.env.NEWS_PER_PAGE}`;
        const response = await fetch(url);
        const data = await response.json();

        await Promise.all(
          data.articles.map(async (d) => {
            await insertNews(d, topic);
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
      const data = await getTopicNews("home");
      return res.status(201).send(data);
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
      const data = await getTopicNews(topic);
      console.log(data);
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
    const { source, feedId } = req.body;

    try {
      if (feedId) {
        const result = getStream(feedId, 80);
        return res.status(201).send(result);
      }
      const data = searchFeed(source);

      if (data.length === 0)
        return res.status(401).send({
          message: `Failed to retrieve stream data from source name: ${source}... Please try again or choose a different source to stream`,
        });
      else {
        // Get Stream Id
        const stream_id = data[0].id;
        const result = getStream(stream_id, 80);
        return res.status(201).send(result);
      }
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

newsRouter.post(
  "/entry",
  expressAsyncHandler(async (req, res) => {
    const { id } = req.body;

    try {
      let data;
      if (id.includes(":")) {
        data = await getFeedlyEntry(id);
      } else {
        data = await getNewsEntry(id);
      }
      if (data) return res.status(201).send(data);
      else
        return res.status(401).send({
          message: `Failed to retrieve an entry with id: ${id}...`,
        });
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

export default newsRouter;
