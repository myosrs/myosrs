import got from "got";

const USERS_SERVICE_URI = "http://users-service:7101";

type CreateUserType = {
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
}
