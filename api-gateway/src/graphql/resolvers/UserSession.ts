import { UsersService } from "../../adapters/UsersService";
import { UserData } from "./Mutation/createUser";

export const UserSession = {
  user: async (userSession: any) => {
    console.log("marker");
    console.log(userSession);
    const user = (await UsersService.fetch({
      userId: userSession.userId
    })) as UserData;

    return user.data;
  }
};
