import got from "got";

const ACCOUNTS_SERVICE_ENDPOINT = "http://accounts-service:7100";

export class AccountsService {
  static all = async () => {
    const body = await got.get(`${ACCOUNTS_SERVICE_ENDPOINT}/accounts`);

    return body;
  };
}
