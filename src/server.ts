import { createServer } from "http";
import { config } from "dotenv";
import { controllRoutesAccess } from "./controller/routes";

config();

const HOST = process.env?.HOST ?? "127.0.0.1";
const PORT = parseInt(process.env?.PORT ?? "3033");

const server = createServer(async (request, response) => {
  response.writeHead(200, {
    "Content-Type": "application/json",
  });

  return await controllRoutesAccess(request, response);
});

server.listen(PORT, HOST, () =>
  console.log(
    `Server is running!\n\nPORT: ${PORT}\nHOST: http://${HOST}:${PORT}/`
  )
);
