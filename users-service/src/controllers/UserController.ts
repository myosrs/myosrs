import { genSaltSync, hashSync } from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import uuid from "uuid/v4";
import { UserEntity } from "../database/entities/UserEntity";
import { BaseController } from "./BaseController";

export class UserController implements BaseController {
  static index = async (req: Request, res: Response, next: NextFunction) => {
    return res.send({});
  };
  static create = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email || !req.body.password) {
      return next(new Error("Invalid body!"));
    }

    try {
      const userRepository = getRepository(UserEntity);
      const userParams = userRepository.create({
        id: uuid(),
        firstName: "Austin",
        lastName: "Paquette",
        email: req.body.email,
        passwordHash: hashSync(req.body.password, genSaltSync(12))
      });
      const user = await userRepository.save(userParams);
      const entity = await userRepository.findOneOrFail(user.id);

      return res.send({ data: entity });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  };
  static show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRepository = getRepository(UserEntity);
      const user = await userRepository.findOneOrFail({
        where: {
          id: req.params.userId
        }
      });

      if (!user) return new Error("Invalid user ID!");

      return res.send({ data: user });
    } catch (e) {
      return next(e);
    }
  };
  static update = (req: Request, res: Response, next: NextFunction) => {
    return res.send({});
  };
  static delete = (req: Request, res: Response, next: NextFunction) => {
    return res.send({});
  };
}
