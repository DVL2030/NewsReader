import express from "express";
import expressAsyncHandler from "express-async-handler";

import { isAuth } from "../middleware/auth.js";
import { query } from "../db/db.js";
import { getSub, subscribe, unsubscribe } from "../services/subService.js";
import { getStream } from "../services/feedlyService.js";

const subRouter = express.Router();

subRouter.post(
  "/get",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;
    try {
      const result = await getSub(userId);
      return res.status(201).send(result);
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
      await subscribe(userId, feed);
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
      await unsubscribe(userId, id);
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
          feeds.map(async (feedId) => {
            const result = await getStream(feedId, 30);
            if (result) collector.push(...result);
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
