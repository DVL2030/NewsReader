import express from "express";
import expressAsyncHandler from "express-async-handler";

const feedsRouter = express.Router();

const feedly_host = process.env.FEEDLY_HOST;

feedsRouter.post(
  "/search",
  expressAsyncHandler(async (req, res) => {
    const { keyword } = req.body;

    try {
      const url = `${feedly_host}search/feeds?query=${encodeURIComponent(
        keyword
      )}&locale=en&count=${process.env.FEED_PER_PAGE}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length === 0)
        return res.status(401).send({
          message: `Failed to search any streams with the keyword: ${keyword}... Please search with a different keyword`,
        });
      else {
        const collector = [];
        data.results.map((item) => {
          let json = {
            id: item.id,
            title: item.title,
            description: item.description,
            url: item.website,
            visualurl: item.visualUrl || item.coverUrl || item.iconUrl,
            updated: item.updated,
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

export default feedsRouter;
