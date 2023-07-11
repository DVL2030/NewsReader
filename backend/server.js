import express from "express";
import dotenv from "dotenv";
import cron from "node-cron";

import newsRouter from "./routers/newsRouter.js";
import userRouter from "./routers/userRouter.js";
import subRouter from "./routers/subRouter.js";
import feedsRouter from "./routers/feedsRouter.js";

dotenv.config();

const port = process.env.port || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {});
app.use("/api/users", userRouter);
app.use("/api/news", newsRouter);
app.use("/api/subscription", subRouter);
app.use("/api/feeds", feedsRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`serve at http://127.0.0.1:${port}`);
});
