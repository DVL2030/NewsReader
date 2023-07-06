import express from "express";
import dotenv from "dotenv";

import newsRouter from "./routers/newsRouter.js";
import userRouter from "./routers/userRouter.js";

dotenv.config();

const port = process.env.port || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {});

app.use("/api/user", userRouter);
app.use("/api/news", newsRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`serve at http://127.0.0.1:${port}`);
});
