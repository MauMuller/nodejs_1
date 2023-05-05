import { OutgoingMessage, IncomingMessage } from "http";
import { getOneOrMorePathnamesFromURL } from "@src/functions/getOneOrMorePathnamesFromURL";
import Routes, { RoutesKeys } from "../routes";

export async function controllRoutesAccess(
  request: IncomingMessage,
  response: OutgoingMessage
) {
  const { pathname } = new URL(
    request.url ?? "",
    `http://${request.headers.host}`
  );

  const [router] = getOneOrMorePathnamesFromURL(pathname, 0);

  const routes = new Routes();
  const responseRoutes = await routes[router as RoutesKeys]?.(
    request,
    response
  );

  return (
    responseRoutes ??
    response.end(
      JSON.stringify({
        message: `Rota Inexistente!`,
      })
    )
  );
}
