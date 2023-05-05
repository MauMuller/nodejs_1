import { getOneOrMorePathnamesFromURL } from "@src/functions/getOneOrMorePathnamesFromURL";
import { IncomingHttpHeaders } from "http";
import { UUID } from "crypto";

export interface UserTypes {
  name: string;
  id: UUID;
  phone: string;
}

interface paramsMethodsTypes {
  url: string;
  headers: IncomingHttpHeaders;
  body: UserTypes;
}

interface MethodsTypes {
  GET: (params: paramsMethodsTypes) => UserTypes[] | UserTypes | {};
  POST: (params: paramsMethodsTypes) => UserTypes;
  DELETE?: (params: paramsMethodsTypes) => string;
  PUT?: (params: paramsMethodsTypes) => string;
}

type keysMethodsTypes = keyof MethodsTypes;
export default class Users {
  usersStorage: UserTypes[];
  methods: MethodsTypes;

  constructor() {
    this.usersStorage = [];
    this.methods = {
      GET: ({ url, headers }) => {
        const { pathname } = new URL(url, `http://${headers.host}`);
        const [userID] = getOneOrMorePathnamesFromURL(pathname, 1);

        return userID ? this.getEspecifUser(userID) : this.getAllUsers();
      },
      POST: ({ body }) => {
        return this.insetNewUser(body);
      },
    };
  }

  async controll(
    url: string,
    method: string = "GET",
    headers: IncomingHttpHeaders,
    body: UserTypes
  ) {
    return this.methods[method as keysMethodsTypes]?.({ url, headers, body });
  }

  getAllUsers() {
    return this.usersStorage;
  }

  getEspecifUser(userID: string) {
    return this.usersStorage.find((user) => user.id === userID) ?? {};
  }

  insetNewUser(user: UserTypes) {
    this.usersStorage.push(user);
    return user;
  }
}
