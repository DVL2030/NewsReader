import { query } from "../db/db.js";

export const getAllNews = async () => {
  const data = await query("SELECT * FROM news WHERE topic='home';");
  return data;
};

export const getNewsEntry = async (id) => {
  let data;
  const result = await query("SELECT * FROM news WHERE id=$1;", [id]);
  if (result.length > 0) data = result[0];
  return data;
};

export const getTopicNews = async (topic) => {
  const data = await query("SELECT * FROM news WHERE topic=$1;", [topic]);
  return data;
};

export const insertNews = async (news, topic) => {
  const q =
    "INSERT INTO news(source, author, title, description, url, urlToImage, publishedAt, content, topic) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)";
  await query(q, [
    news.source.name || news.source,
    news.author,
    news.title,
    news.description,
    news.url,
    news.urlToImage || news.urltoimage,
    news.publishedAt || news.publishedat,
    news.content,
    topic,
  ]);
};

export const removeNews = async (id) => {
  const q = "DELETE FROM news WHERE id=$1";
  await query(q, [id]);
};
