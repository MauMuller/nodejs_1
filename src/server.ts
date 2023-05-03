import { createServer } from "http";
import { config } from "dotenv";

config();

const HOST = process.env?.HOST ?? "127.0.0.1";
const PORT = parseInt(process.env?.PORT ?? "3033");

const server = createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ teste: "1" }));
});

server.listen(PORT, HOST, () =>
  console.log(
    `Server is running!\n\nPORT: ${PORT}\nHOST: http://${HOST}:${PORT}/`
  )
);
