import { Request, Response } from "express"
import { BaseController } from "./BaseController"

export class AccountController implements BaseController {
  static index = (req: Request, res: Response) => {
    return res.send({})
  }
  static create = (req: Request, res: Response) => {
    return res.send({})
  }
  static show = (req: Request, res: Response) => {
    return res.send({})
  }
  static update = (req: Request, res: Response) => {
    return res.send({})
  }
  static delete = (req: Request, res: Response) => {
    return res.send({})
  }
}
