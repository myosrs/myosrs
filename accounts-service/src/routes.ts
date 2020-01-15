import {Express} from "express"
import { AccountController } from "./controllers/AccountController"

export const setupRoutes = (app: Express) => {
  app.get(`/accounts`, AccountController.index)
}