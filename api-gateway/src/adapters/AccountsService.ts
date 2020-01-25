import got from "got";

const ACCOUNTS_SERVICE_ENDPOINT = "http://accounts-service:7100";

type FetchAccountType = {
  name: string;
};

export class AccountsService {
  static async all() {
    const body = await got.get(`${ACCOUNTS_SERVICE_ENDPOINT}/accounts`).json();

    return body;
  }

  static async fetch({ name }: FetchAccountType) {
    const body = await got
      .get(`${ACCOUNTS_SERVICE_ENDPOINT}/accounts/${name}`)
      .json();

    return body;
  }
}
