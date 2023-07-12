import { query } from "../db/db.js";
import { fetchWithRandAgent } from "../utils.js";

const fetchEntry = (entry) => {
  // Parse description
  const description = entry.summary
    ? entry.summary.content.search("<figure") > 0
      ? entry.summary.content.substring(
          entry.summary.content.search("</figure>") + 9
        )
      : entry.summary.content
    : null;
  const content = entry.content
    ? entry.content.content.search("<figure") > 0
      ? entry.content.content.substring(
          entry.content.content.lastIndexOf("</figure>") + 9
        )
      : entry.content.content
    : null;

  // Save an entry data into a json;
  const data = {
    id: entry.id.split("_")[1],
    keywords: entry.keywords ? entry.keywords : null,
    source: entry.origin.title,
    author: entry.author,
    title: entry.title,
    description: description,
    url: entry.alternate[0].href,
    urltoimage: entry.visual ? entry.visual.url : null,
    publishedat: entry.published,
    content: content,
  };
  return data;
};

export const getFeedlyEntry = async (entryId) => {
  let data;

  const url = `${process.env.FEEDLY_HOST}entries/${entryId}`;
  const result = await fetchWithRandAgent(url);
  if (result.length > 0) {
    const entry = result[0];
    data = fetchEntry(entry);
  }

  return data;
};

export const searchFeed = async (source) => {
  const url = `${
    process.env.FEEDLY_HOST
  }search/feeds?query=${encodeURIComponent(source)}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.errorCode)
    return {
      status: error,
      code: data.errorCode,
      message: data.errorMessage,
    };
  return data.results;
};

export const getStream = async (feedId, count) => {
  const collector = [];

  const url = `${process.env.FEEDLY_HOST}streams/contents?streamId=${feedId}&count=${count}`;
  const data = await fetchWithRandAgent(url);

  // Save stream data into the collector array;
  if (data && data.items) {
    data.items.map((item) => {
      const json = fetchEntry(item);
      collector.push(json);
    });
  }
  return collector;
};
