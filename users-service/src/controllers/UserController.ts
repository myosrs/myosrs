import { Request, Response, NextFunction } from "express";
import { BaseController } from "./BaseController";
import { UserEntity } from "../database/entities/UserEntity";
import { getRepository } from "typeorm";
import uuid from "uuid/v4";
import { hashSync, genSaltSync } from "bcryptjs";

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

    return res.send({});
  };
  static show = (req: Request, res: Response, next: NextFunction) => {
    return res.send({});
  };
  static update = (req: Request, res: Response, next: NextFunction) => {
    return res.send({});
  };
  static delete = (req: Request, res: Response, next: NextFunction) => {
    return res.send({});
  };
}
