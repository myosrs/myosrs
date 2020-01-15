import { Request, Response } from "express"

export class BaseController {
  /**
   * Provide a list of resources
   */
  static index = (req: Request, res: Response) => {
    return res.status(405).send({
      code: "method_not_allowed",
      message: "The parameters were likely valid but the request failed.",
    })
  }

  /**
   * Create a new resource
   */
  static create = (req: Request, res: Response) => {
    return res.status(405).send({
      code: "method_not_allowed",
      message: "The parameters were likely valid but the request failed.",
    })
  }

  /**
   * Show an existing resource
   */
  static show = (req: Request, res: Response) => {
    return res.status(405).send({
      code: "method_not_allowed",
      message: "The parameters were likely valid but the request failed.",
    })
  }

  /**
   * Update an existing resource
   */
  static update = (req: Request, res: Response) => {
    return res.status(405).send({
      code: "method_not_allowed",
      message: "The parameters were likely valid but the request failed.",
    })
  }

  /**
   * Delete an existing resource
   */
  static delete = (req: Request, res: Response) => {
    return res.status(405).send({
      code: "method_not_allowed",
      message: "The parameters were likely valid but the request failed.",
    })
  }
}
