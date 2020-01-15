import { Request, Response } from "express"
import { BaseController } from "./BaseController"

export class AccountController implements BaseController {
  static index = (req: Request, res: Response) => {
    return res.send({})
  }
}
