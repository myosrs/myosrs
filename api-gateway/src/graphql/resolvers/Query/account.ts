import { AccountsService } from "../../../adapters/AccountsService";

// TODO: Improving typing here
export type AccountData = { data: Account };
type Account = {
  name: string;
};

export const accountResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  const account = (await AccountsService.fetch({
    name: args.name
  })) as AccountData;

  return account.data;
};
