import { Express } from "express";
import { UserController } from "./controllers/UserController";

export const setupRoutes = (app: Express) => {
  app.get(`/users`, UserController.index);
  app.post(`/users`, UserController.create);
};
