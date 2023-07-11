import express from "express";
import expressAsyncHandler from "express-async-handler";
import dotenv from "dotenv";
import cron from "node-cron";
import { TOPICS } from "../utils.js";
import { query } from "../db/db.js";
import { v4 as uuidv4 } from "uuid";
import { getTopicNews, insertNews } from "../services/newsService.js";

dotenv.config();
const newsRouter = express.Router();

const host = process.env.NEWS_HOST;
const apikey = process.env.NEWS_API;
const feedly_host = process.env.FEEDLY_HOST;
const newsPerPage = process.env.NEWS_PER_PAGE;

// Cron job to fetch news from home every hour.
cron.schedule("0 * * * *", async () => {
  try {
    const url = `${host}top-headlines?country=us&apiKey=${apikey}&pageSize=40`;
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
        const url = `${host}top-headlines?country=us&category=${
          topic === "world" ? "general" : topic
        }&apiKey=${apikey}&pageSize=${newsPerPage}`;
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
    const { source } = req.body;

    try {
      const url = `${feedly_host}search/feeds?query=${encodeURIComponent(
        source
      )}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.errorCode && data.errorCode === 429)
        return res.status(429).send({
          message: data.errorMessage,
        });

      if (data.results.length === 0)
        return res.status(401).send({
          message: `Failed to retrieve stream data from source name: ${source}... Please try again or choose a different source to stream`,
        });
      else {
        // Get Stream Id
        const stream_id = data.results[0].id;
        const url = `${feedly_host}streams/contents?streamId=${stream_id}&count=200`;
        const response = await fetch(url);
        const resData = await response.json();
        const collector = [];

        // Save stream data into the collector array;
        resData.items.map((item) => {
          let json = {
            id: item.id.split("_")[1],
            source: item.origin.title,
            author: item.author,
            title: item.title,
            url: item.alternate[0].href,
            urltoimage: item.visual ? item.visual.url : null,
            publishedat: item.published,
          };
          collector.push(json);
        });
        return res.status(201).send(collector);
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
      const url = `${feedly_host}entries/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.length === 0)
        return res.status(401).send({
          message: `Failed to retrieve an entry with id: ${id}...`,
        });
      else {
        // Get Stream Id
        const entry = data[0];

        // Parse description
        const description = entry.summary
          ? entry.summary.content.search("<figure") > 0
            ? entry.summary.content.substring(
                entry.summary.content.search("</figure>") + 9
              )
            : entry.summary.content
          : null;
        const content = entry.content
          ? entry.content.content.search("<figure") > 0
            ? entry.content.content.substring(
                entry.content.content.lastIndexOf("</figure>") + 9
              )
            : entry.content
          : null;

        // Save an entry data into a json;
        let json = {
          //   id: entry.id,
          id: entry.id.split("_")[1],
          keywords: entry.keywords,
          source: entry.origin.title,
          author: entry.author,
          title: entry.title,
          description: description,
          url: entry.alternate[0].href,
          urltoimage: entry.visual ? entry.visual.url : null,
          thumbnail: entry.thumbnail ? entry.thumbnail[0] : null,
          publishedat: entry.published,
          content: content,
        };
        return res.status(201).send(json);
      }
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

export default newsRouter;
