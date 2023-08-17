import express from "express";
import expressAsyncHandler from "express-async-handler";
import OpenAI from "openai";
import { isAuth } from "../middleware/auth.js";

const gptRouter = express.Router();

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

gptRouter.post(
  "/ask",
  expressAsyncHandler(async (req, res) => {
    const { messages } = req.body;
    let apiMsgs = messages.map((msg) => {
      let role = msg.sender === "ChatGPT" ? "assistant" : "user";
      return { role, content: msg.message };
    });
    try {
      const completion = await openai.chat.completions.create({
        messages: apiMsgs,
        model: "gpt-3.5-turbo",
      });

      let resMessage = completion.choices[0].message.content;
      return res.status(201).send({ message: resMessage });
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

export default gptRouter;
