import express from "express";
import expressAsyncHandler from "express-async-handler";

import { isAuth } from "../middleware/auth.js";
import { query } from "../db/db.js";
import { fetchWithRandAgent } from "../utils.js";

const subRouter = express.Router();

subRouter.post(
  "/get",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;
    const collector = [];
    try {
      const result = await query(
        "SELECT feeds FROM subscription WHERE userid=$1",
        [userId]
      );

      const feeds = result[0].feeds;

      if (feeds.length > 0) {
        await Promise.all(
          feeds.map(async (feed) => {
            const data = await query("SELECT * FROM feed WHERE id=$1", [feed]);
            if (data[0]) {
              let json = {
                id: data[0].id,
                title: data[0].title,
                visualurl: data[0].visualurl,
                url: data[0].url,
                description: data[0].description,
              };
              collector.push(json);
            }
          })
        );
        return res.send(collector);
      } else {
        return res.send([]);
      }
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

subRouter.post(
  "/subscribe",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { userId, feed } = req.body;

    try {
      await query(
        "INSERT INTO feed(id, title, visualurl, url, description, updated) VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT(id) DO NOTHING",
        [
          feed.id,
          feed.title,
          feed.visualurl,
          feed.website,
          feed.description,
          feed.updated,
        ]
      );

      // Create new entry for user if the user does not have any subscription info yet
      // Update sub entry if it exists.
      await query(
        "INSERT INTO subscription(userid, feeds) VALUES ($1, $2) ON CONFLICT(userid) " +
          "DO UPDATE SET feeds=(SELECT ARRAY(SELECT DISTINCT UNNEST(feeds || $2)) from subscription " +
          "WHERE subscription.userid=$1)",
        [userId, [feed.id]]
      );

      return res.status(201).send({ success: true });
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

subRouter.post(
  "/unsubscribe",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { userId, id } = req.body;
    try {
      //   const result = await query(
      //     "UPDATE subscription SET feeds = (SELECT ARRAY_REMOVE(feeds, $1) FROM subscription WHERE userid=$2)",
      //     [id, userId]
      //   );
      return res.status(201).send({ success: true });
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

subRouter.post(
  "/stream",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;
    try {
      const result = await query(
        "SELECT feeds FROM subscription WHERE userid=$1",
        [userId]
      );
      const feeds = result[0].feeds;

      const collector = [];

      if (feeds.length > 0) {
        await Promise.all(
          feeds.map(async (feed) => {
            const url = `${process.env.FEEDLY_HOST}streams/contents?streamId=${feed}&count=20`;
            const data = await fetchWithRandAgent(url);

            // Save stream data into the collector array;
            if (data && data.items) {
              data.items.map((item) => {
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
            }
          })
        );
        return res.status(201).send(collector);
      } else {
        return res.status(201).send([]);
      }
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

export default subRouter;
