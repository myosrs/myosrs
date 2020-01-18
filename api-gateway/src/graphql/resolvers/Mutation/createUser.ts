import { UsersService } from "../../../adapters/UsersService";

// root, args, context, info
export const createUserResolver = async (
  _: Object,
  { email, password }: any
) => {
  const user = await UsersService.create({ email, password });

  return user;
};
