import Router from "./Router.mjs";
import fs from "node:fs";

const router = new Router();

const urls = {};

const generateUrlHash = () => {
  const url = Math.random().toString(36).substring(2, 10);
  if (urls[url]) return generateUrlHash();
  return url;
};

router
  .get("files", (req, res) => {
    if (req.url.includes("html"))
      res.setHeader("Content-Type", "text/html");
    else
      res.setHeader("Content-Type", "text/javascript");

    res.statusCode = 200;
    fs.createReadStream(`${process.cwd()}/./frontend${req.url}`, "utf-8").pipe(
      res
    );
  })
  .post("/addUrl", (req, res) => {
    const shortenUrl = generateUrlHash();

    let data = "";

    req.on('data', chunk => {
      data += chunk.toString();
    });

    req.on('end', () => {
      data = JSON.parse(data);

      urls[shortenUrl] = data.url;
      res.end(JSON.stringify({ shortenUrl, url: data.url }));
    });

    req.on('error', (err) => {
      res.statusCode = 500;
      res.end(JSON.stringify({error: err.message}));
    });
  })
  .get("/:id", (req, res) => {
    const url = urls[req.params.id];

    if (!url.startsWith("http"))
      urls[req.params.id] = `http://${url}`;

    res.statusCode = 301;
    res.setHeader("Location", urls[req.params.id]);
    res.end();
  });

export default router;
