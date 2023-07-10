import express from "express";
import expressAsyncHandler from "express-async-handler";

import { isAuth } from "../middleware/auth.js";
import { query } from "../db/db.js";

const subRouter = express.Router();

subRouter.get(
  "/get",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { id } = req.body;
    try {
      const feeds = await query(
        "SELECT feeds FROM subscription WHERE userid=$1",
        [id]
      );

      if (feeds.length > 0) {
        const collector = [];

        await Promise.all(
          feeds.map(async (feed) => {
            const data = await query("SELECT * FROM feed WHERE id=$1", [
              feed.id,
            ]);
            let json = {
              id: data[0].id,
              title: data[0].title,
              visualurl: data[0].visualurl,
              url: data[0].url,
              description: data[0].description,
            };
            collector.push(json);
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

export default subRouter;
