import { Express } from "express"
import { AccountController } from "./controllers/UserController"

export const setupRoutes = (app: Express) => {
  app.get(`/users`, AccountController.index)
}
