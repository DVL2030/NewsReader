import express from "express";
import expressAsyncHandler from "express-async-handler";

import { isAuth } from "../middleware/auth.js";
import { query } from "../db/db.js";
import { insertNews } from "../services/newsService.js";
import { deleteBookmark, insertBookmark } from "../services/bookmarkService.js";

const bookmarkRouter = express.Router();

bookmarkRouter.post(
  "/get",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;
    try {
      let resData;
      const result = await query(
        "SELECT entries FROM bookmark WHERE userid=$1",
        [userId]
      );
      if (result.length > 0) resData = result[0].entries;

      return res.status(201).send(resData);
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

bookmarkRouter.post(
  "/getAllEntries",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;
    try {
      let entries;
      const result = await query(
        "SELECT entries FROM bookmark WHERE userid=$1",
        [userId]
      );
      if (result.length > 0) entries = result[0].entries;
      else return res.status(201).send([]);

      const collector = [];
      await Promise.all(
        entries.map(async (e) => {
          const data = await query("SELECT * FROM bmark_entries WHERE id=$1", [
            e,
          ]);
          if (data[0]) {
            collector.push(data[0]);
          }
        })
      );

      return res.status(201).send(collector);
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
    const { userId, data } = req.body;
    try {
      await insertBookmark(userId, data);
      res.status(201).send(true);
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
      await deleteBookmark(userId, id);
      return res.status(201).send({ success: true });
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

export default bookmarkRouter;
