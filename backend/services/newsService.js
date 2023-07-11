import { query } from "../db/db.js";

export const getAllNews = async () => {
  const data = await query("SELECT * FROM news WHERE topic='home';");
  return data;
};

export const getTopicNews = async (topic) => {
  const data = await query("SELECT * FROM news WHERE topic=$1;", [topic]);
  const json = {};
  json[topic] = data;

  return json;
};

export const insertNews = async (news, topic) => {
  const q =
    "INSERT INTO news(source, author, title, description, url, urlToImage, publishedAt, content, topic) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)";
  await query(q, [
    news.source.name,
    news.author,
    news.title,
    news.description,
    news.url,
    news.urlToImage,
    news.publishedAt,
    news.content,
    topic,
  ]);
};
