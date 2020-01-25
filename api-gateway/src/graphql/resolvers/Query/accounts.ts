import { AccountsService } from "../../../adapters/AccountsService";

// TODO: Improving typing here
export type AccountData = { data: Account };
type Account = {
  name: string;
};

export const accountsResolver = async () => {
  const accounts = ((await AccountsService.all()) as unknown) as AccountData;

  return accounts.data;
};
