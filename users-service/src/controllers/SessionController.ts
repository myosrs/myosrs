import { compareSync } from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { UserEntity } from "../database/entities/UserEntity";
import { BaseController } from "./BaseController";
import { addHours } from "date-fns";
import uuid from "uuid/v4";
import { UserSessionEntity } from "../database/entities/UserSessionEntity";

export class SessionController implements BaseController {
  static create = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email || !req.body.password) {
      return next(new Error("Invalid body!"));
    }

    try {
      const userRepository = getRepository(UserEntity);
      const userSessionRepository = getRepository(UserSessionEntity);
      const user = await userRepository.findOneOrFail({
        email: req.body.email
      });

      if (!user) return next(new Error("Invalid email!"));

      if (!compareSync(req.body.password, user.passwordHash)) {
        return next(new Error("Invalid password!"));
      }

      // const expiresAt = addHours(new Date(), USER_SESSION_EXPIRY_HOURS)
      const expiresAt = addHours(new Date(), 1);
      const sessionToken = uuid();

      const userSessionParams = userSessionRepository.create({
        expiresAt,
        id: sessionToken,
        user
      });
      const newSession = await userSessionRepository.save(userSessionParams);
      const userSession = await userSessionRepository.findOneOrFail(
        newSession.id
      );

      return res.send({ data: { ...userSession, userId: user.id } });
    } catch (e) {
      return next(e);
    }
  };

  static show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userSessionRepository = getRepository(UserSessionEntity);
      const userSession = await userSessionRepository.findOneOrFail({
        where: {
          id: req.params.sessionId
        },
        relations: ["user"]
      });

      if (!userSession) return next(new Error("Invalid Session ID"));

      return res.send({
        data: { ...userSession, userId: userSession.user.id }
      });
    } catch (e) {
      return next(e);
    }
  };
}
