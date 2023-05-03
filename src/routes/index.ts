import { OutgoingMessage, IncomingMessage } from "http";

export default class Routes {
  users(request: IncomingMessage, response: OutgoingMessage) {
    return response.end();
  }
}

export type RoutesKeys = keyof typeof Routes.prototype;
