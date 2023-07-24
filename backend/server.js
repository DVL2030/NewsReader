import http from "http";
import express from "express";
import dotenv from "dotenv";
import cron from "node-cron";
import path from "path";
import cors from "cors";

import newsRouter from "./routers/newsRouter.js";
import userRouter from "./routers/userRouter.js";
import subRouter from "./routers/subRouter.js";
import feedsRouter from "./routers/feedsRouter.js";
import bookmarkRouter from "./routers/bookmarkRouter.js";
import adminRouter from "./routers/adminRouter.js";

dotenv.config();

const port = process.env.PORT || 5000;
const __dirname = path.resolve();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/news", newsRouter);
app.use("/api/subscription", subRouter);
app.use("/api/feeds", feedsRouter);
app.use("/api/bookmark", bookmarkRouter);
app.use("/api/admin", adminRouter);

const buildPath = path.join(__dirname, "frontend/build");

app.use(express.static(buildPath));
// app.get("/", (req, res) => {
//   res.sendFile(path.join(buildPath, "index.html"), function (err) {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// const httpServer = http.Server(app);

// httpServer.listen(port, () => {
//   console.log(`Serve at http://localhost:${port}`);
// });

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
