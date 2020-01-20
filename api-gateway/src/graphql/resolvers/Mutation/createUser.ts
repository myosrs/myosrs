import { UsersService } from "../../../adapters/UsersService";

// TODO: Improving typing here
export type UserData = { data: User }
type User = {
  id: string;
  email: string;
};

// root, args, context, info
export const createUserResolver = async (
  _: Object,
  { email, password }: any
) => {
  const user = await UsersService.create({ email, password }) as UserData;

  return user.data;
};
