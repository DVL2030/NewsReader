export const getToday = () => {
  const date = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("En-en", options);
};

export const calcTimeDiff = (time) => {
  const now = Date.now();
  const pubDate = new Date(time);
  const timeDiff = now - pubDate;
  if (timeDiff < 1000 * 3600 * 24) {
    const hourDiff = parseInt(timeDiff / (1000 * 3600));
    return `${hourDiff < 2 ? "an hour" : `${hourDiff} hours`} ago`;
  } else if (timeDiff < 1000 * 3600 * 24 * 30) {
    const daysDiff = parseInt(timeDiff / (1000 * 3600 * 24));
    return `${daysDiff < 2 ? "a day" : `${daysDiff} days`} ago`;
  } else if (timeDiff < 1000 * 3600 * 24 * 30 * 12) {
    const monthsDiff = parseInt(timeDiff / (1000 * 3600 * 24 * 30));
    return `${monthsDiff < 2 ? "a month" : `${monthsDiff} months`} ago`;
  }
};

export const getIcon = (url) => {
  const obj = new URL(url);
  const host = obj.host;
  const protocol = obj.protocol;
  return `${protocol}//${host}/favicon.ico`;
};
