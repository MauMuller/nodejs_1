import { IncomingMessage, OutgoingMessage, createServer } from "http";
import { config } from "dotenv";

import Routes, { RoutesKeys } from "./routes";

config();

const HOST = process.env?.HOST ?? "127.0.0.1";
const PORT = parseInt(process.env?.PORT ?? "3033");

type ResponseRoutes = OutgoingMessage<IncomingMessage> | undefined;

const server = createServer(async (request, response) => {
  response.writeHead(200, {
    "Content-Type": "application/json",
  });

  const { pathname } = new URL(
    request.url ?? "",
    `http://${request.headers.host}`
  );

  if (pathname === "/")
    return response.end(
      JSON.stringify({
        message: `Rota Inicial`,
      })
    );

  const routes = new Routes();
  const formatedPathname = pathname.replace("/", "");

  const responseFromRoutes: ResponseRoutes = routes[
    formatedPathname as RoutesKeys
  ]?.(request, response);

  return (
    responseFromRoutes ??
    response.end(
      JSON.stringify({
        message: `Rota Inexistente!`,
      })
    )
  );
});

server.listen(PORT, HOST, () =>
  console.log(
    `Server is running!\n\nPORT: ${PORT}\nHOST: http://${HOST}:${PORT}/`
  )
);
