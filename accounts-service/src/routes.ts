import {Express} from "express"
import { AccountController } from "./controllers/AccountController"

export const setupRoutes = (app: Express) => {
  app.get(`/accounts`, AccountController.index)
  // app.post(`/accounts`, AccountController.create)
  app.get(`/accounts/:name`, AccountController.show)
  // app.put(`/accounts/:id`, AccountController.update)
  // app.delete(`/accounts/:id`, AccountController.delete)
}