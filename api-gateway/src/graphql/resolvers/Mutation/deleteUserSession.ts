import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { UsersService } from "../../../adapters/UsersService";

// root, args, context, info
export const deleteUserSessionResolver = async (
  _: Object,
  { sessionId }: any,
  context: ExpressContext
) => {
  try {
    await UsersService.deleteSession({
      sessionId
    });

    context.res.clearCookie("userSessionId");

    return true;
  } catch (e) {
    return false;
  }
};
