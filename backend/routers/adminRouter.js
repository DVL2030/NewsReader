import express from "express";
import expressAsyncHandler from "express-async-handler";

import { isAdmin, isAuth } from "../middleware/auth.js";
import { query } from "../db/db.js";
import { deleteBookmark, insertBookmark } from "../services/bookmarkService.js";

const adminRouter = express.Router();

adminRouter.post(
  "/dashboard",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const total_news = await query("SELECT COUNT(*) from news");
      const total_feeds = await query("SELECT COUNT(*) from feed");
      const total_bmarks = await query("SELECT COUNT(*) from bookmark");
      const total_users = await query("SELECT COUNT(*) from users");

      return res.status(201).send({
        total_news: total_news[0].count,
        total_feeds: total_feeds[0].count,
        total_bmarks: total_bmarks[0].count,
        total_users: total_users[0].count,
      });
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

adminRouter.post(
  "/news",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const top_bookmarks = await query(
        "select * from news RIGHT JOIN (select unnest(entries) as entry, count(*) from bookmark group by entry order by count DESC) as e ON news.id = e.entry"
      );

      const top_subs = await query(
        "select * from feed RIGHT JOIN (select unnest(feeds) as feed, count(*) from subscription group by feed order by count DESC) as f ON feed.id = f.feed"
      );

      const all_news = await query("select * from news");

      return res.status(201).send({
        top_bookmarks,
        top_subs,
        all_news,
      });
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

adminRouter.post(
  "/user",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const all_users = await query(
        "select id, name, email, isadmin from users"
      );

      res.status(201).send({ all_users: all_users });
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

export default adminRouter;
