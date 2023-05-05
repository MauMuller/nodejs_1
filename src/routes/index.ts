import { OutgoingMessage, IncomingMessage } from "http";
import Users, { UserTypes } from "@src/models/Users";

type EventON = {
  (event: "close", listener: () => void): IncomingMessage;
  (event: "data", listener: (chunk: any) => void): IncomingMessage;
  (event: "end", listener: () => void): IncomingMessage;
  (event: "error", listener: (err: Error) => void): IncomingMessage;
  (event: "pause", listener: () => void): IncomingMessage;
  (event: "readable", listener: () => void): IncomingMessage;
  (event: "resume", listener: () => void): IncomingMessage;
  (event: string | symbol, listener: (...args: any[]) => void): IncomingMessage;
};

const getDataRequest = (on: EventON) => {
  return new Promise((resolve, reject) => {
    on("data", (chunk: UserTypes) => {
      resolve(chunk);
    });
  });
};

export default class Routes {
  async users(request: IncomingMessage, response: OutgoingMessage) {
    console.log(request);

    const { method, headers, url, on } = request;
    const users = new Users();

    const body = (await getDataRequest(on)) as UserTypes;

    const responseRouter = await users.controll(
      url ?? "",
      method,
      headers,
      body
    );
    return response.end(JSON.stringify(responseRouter));
  }
}

export type RoutesKeys = keyof typeof Routes.prototype;
