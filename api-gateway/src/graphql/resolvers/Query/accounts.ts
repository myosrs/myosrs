import { AccountsService } from "../../../adapters/AccountsService";

export const accountsResolver = async () => {
  return await AccountsService.all();
};
