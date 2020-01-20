import got from "got";

const USERS_SERVICE_URI = "http://users-service:7101";

// TODO: stronger typings
type CreateUserType = {
  email: string;
  password: string;
};

type FetchUserType = {
  userId: string;
};

type CreateUserSessionType = {
  email: string;
  password: string;
};

export class UsersService {
  static async create({ email, password }: CreateUserType) {
    const body = await got
      .post(`${USERS_SERVICE_URI}/users`, { json: { email, password } })
      .json();

    return body;
  }

  static async fetch({ userId }: FetchUserType) {
    const body = await got.get(`${USERS_SERVICE_URI}/users/${userId}`).json();

    return body;
  }

  static async createSession({ email, password }: CreateUserSessionType) {
    const body = await got
      .post(`${USERS_SERVICE_URI}/sessions`, { json: { email, password } })
      .json();

    return body;
  }
}
