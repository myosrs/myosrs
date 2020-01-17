import { NextFunction, Request, Response } from "express"
import { getRepository, getManager } from "typeorm"
import { AccountEntity } from "../database/entities/AccountEntity"
import { BaseController } from "./BaseController"

export class AccountController implements BaseController {
  static index = async (req: Request, res: Response, next: NextFunction) => {
    const accountRepository = getRepository(AccountEntity)
    const [accounts, count] = await accountRepository.findAndCount()

    return res.send({ count, data: accounts })
  }

  static show = (req: Request, res: Response, next: NextFunction) => {
    return res.send({ data: {} })
  }
}
