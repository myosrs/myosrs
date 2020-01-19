import { UsersService } from "../../../adapters/UsersService";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";

// TODO: Improving typing here
type UserData = { data: User };
type User = {
  id: string;
  email: string;
};

// root, args, context, info
export const createUserSessionResolver = async (
  _: Object,
  { email, password }: any,
  context: ExpressContext
) => {
  const userSession = (await UsersService.createSession({
    email,
    password
  })) as UserData;

  context.res.cookie("userSessionId", userSession.data.id, { httpOnly: true });

  return userSession.data;
};
