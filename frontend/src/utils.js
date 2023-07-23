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

export const extractURLParam = (url, param) => {
  const params = new URL(url).searchParams;
  const value = params.get(param);
  return value;
};

export const parseDOM = (htmlToConvert) => {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlToConvert, "text/html");
  return html.body;
};

export const CHART_COLORS = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
};

export const createChart = (el, type, data, options) => {};

export const renderDashboard = () => {
  // 대쉬보드 차트 설정
  const dashboard = document.getElementById("dashboard").getContext("2d");
  const chart_options = {
    responsive: true,
    chart: {
      title: "Total Visits",
    },
  };
  const data = {
    labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Website Visits",
        data: [182, 103, 200, 145, 155, 204],
        fill: false,
        borderColor: "#0B2948",
        tension: 0.1,
      },
    ],
  };

  return { dashboard, type: "line", data, chart_options };
};
