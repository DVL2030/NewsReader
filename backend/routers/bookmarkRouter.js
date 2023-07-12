import express from "express";
import expressAsyncHandler from "express-async-handler";

import { isAuth } from "../middleware/auth.js";
import { query } from "../db/db.js";

const bookmarkRouter = express.Router();

bookmarkRouter.post(
  "/get",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;
    try {
      const result = await query(
        "SELECT entries FROM bookmark WHERE userid=$1",
        [userId]
      );
      return res.send(result);
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

bookmarkRouter.post(
  "/add",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;
    const collector = [];
    try {
      await query("INSERT INTO news ");
      const result = await query(
        "INSERT INTO entries FROM bookmark WHERE userid=$1",
        [userId]
      );

      if (entries.length > 0) {
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

bookmarkRouter.post(
  "/remove",
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

bookmarkRouter.post(
  "/remove",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { userId, id } = req.body;
    try {
      const result = await query("", [userId]);

      return res.status(201).send({ success: true });
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

export default subRouter;
