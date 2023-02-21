import http from "node:http";
import router from "./RouterFabric.mjs"

const PORT = 3000;


const server = http.createServer((req, res) => {
  req.url === "/" && req.method === "GET"? req.url = "/index.html" : req.url;
  router.resolve(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
