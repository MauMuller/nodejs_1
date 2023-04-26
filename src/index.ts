import { createServer } from "http";

const HOST = "127.0.0.1";
const PORT = 3000;

const server = createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ teste: "1" }));
});

server.listen(PORT, HOST, () => {
  console.log(`Servidor rodando no http://${HOST}:${PORT}/`);
});
