import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import { HttpsProxyAgent } from "https-proxy-agent";
import { HttpProxyAgent } from "http-proxy-agent";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );
};

export const TOPICS = [
  "world",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
];

const getUserAgent = () => {
  const os = [
    "X11; Linux x86_64",
    "X11; U; Linux x86_64; en-US",
    "X11; U; Linux i686; en-US",
    "Windows NT 10.0; Win64; x64",
    "Windows NT 10.0; WOW64",
    "Windows NT 10.0",
    "Macintosh; Intel Mac OS X 10_15_7",
    "Macintosh; Intel Mac OS X 10_15_5",
    "Macintosh; Intel Mac OS X 10_11_6",
    "Macintosh; Intel Mac OS X 10_6_6",
    "Macintosh; Intel Mac OS X 10_10_5",
    "Macintosh; Intel Mac OS X 10_7_5",
    "Macintosh; Intel Mac OS X 10_11_3",
    "Macintosh; Intel Mac OS X 10_10_3",
  ];

  const randomChromeVer = `${Math.floor(Math.random() * 4) + 100}.0.${
    Math.floor(Math.random() * 400) + 4800
  }.${Math.floor(Math.random() * 4) + 100}`;

  return `Mozilla/5.0 (${
    os[Math.floor(Math.random() * os.length)]
  }) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${randomChromeVer} Safari/537.36`;
};

const getHttpHeader = () => {
  let headers = new Headers({
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
    DNT: "1",
    "Upgrade-Insecure-Requests": "1",
    "Cache-Control": "no-cache",
    "device-memory": `${Math.floor(Math.random() * 16) + 8}`,
    "User-Agent": getUserAgent(),
  });
  return headers;
};

export const fetchWithRandAgent = async (url) => {
  const options = {
    method: "GET",
    headers: getHttpHeader(),
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};
