import { query } from "../db/db.js";

export const insertBookmark = async (userId, news) => {
  // Create new bookmark if user does not have any bookmark yet.
  // Update bookmark if it exists.
  await query(
    "INSERT INTO bookmark(userId, entries) VALUES ($1, $2) ON CONFLICT(userid) " +
      "DO UPDATE SET entries=(SELECT ARRAY(SELECT DISTINCT UNNEST(entries || $2)) from bookmark " +
      "WHERE bookmark.userid=$1)",
    [userId, [news.id]]
  );

  // Create new entry in bookmarkEntry Table
  await query(
    "INSERT INTO bmark_entries(id, source, author, title, description, url, urltoimage, publishedat, content) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) " +
      "ON CONFLICT(id) DO NOTHING",
    [
      news.id,
      news.source.name || news.source,
      news.author,
      news.title,
      news.description,
      news.url,
      news.urlToImage || news.urltoimage,
      news.publishedAt || news.publishedat,
      news.content,
    ]
  );
};

export const deleteBookmark = async (userId, id) => {
  await query(
    "UPDATE bookmark SET entries = (SELECT ARRAY_REMOVE(entries, $1) FROM bookmark WHERE userid=$2)",
    [id, userId]
  );
};
