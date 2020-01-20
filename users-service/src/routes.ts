import { Express } from "express";
import { UserController } from "./controllers/UserController";
import { SessionController } from "./controllers/SessionController";

export const setupRoutes = (app: Express) => {
  app.post(`/sessions`, SessionController.create);

  app.get(`/users`, UserController.index);
  app.post(`/users`, UserController.create);
  app.get(`/users/:userId`, UserController.show);
};
