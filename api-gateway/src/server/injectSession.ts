import { Request, Response, NextFunction } from "express";
import { UsersService } from "../adapters/UsersService";
import { UserData } from "../graphql/resolvers/Mutation/createUser";

export const injectSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.cookies.userSessionId) {
    const userSession = (await UsersService.fetchSession({
      sessionId: req.cookies.userSessionId
    })) as UserData;
    res.locals.userSession = userSession.data;
  }

  return next();
};
