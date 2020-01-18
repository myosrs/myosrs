import bodyParser from "body-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { createConnection } from "typeorm";
import { setupRoutes } from "../routes";

require("dotenv").config();

export const startServer = async () => {
  try {
    /**
     * Create a connection with the database
     */
    const database = await createConnection({
      name: "default",
      type: "mysql",
      database: "db",
      url: process.env.DATABASE_URL,
      entities: [__dirname + "/../database/entities/**/*.{ts,js}"],
      migrations: [__dirname + "/../database/migrations/**/*.{ts,js}"],
      synchronize: true,
      logging: true,
      extra: {
        charset: "utf8mb4_unicode_ci"
      }
    });

    if (database.isConnected === true) {
      console.log("Successfully connected to database");
    }
    /**
     * Initialize the Express Server
     */
    const app = express();

    /**
     * Express Middleware to enable CORS
     */
    app.use(
      cors({
        origin: (_, cb) => cb(null, true),
        credentials: true
      })
    );

    /**
     * Express Middleware for parsing POST/PUT/DELETE body contents
     */
    app.use(bodyParser.json());

    /**
     * Bind the routes to the Express Server
     */
    setupRoutes(app);

    /**
     * Error Handling Middleware for the GraphQL API Gateway
     */
    app.use(
      (
        error: { message: string },
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        return res.status(500).send({
          message: error.message
        });
      }
    );

    /**
     * Bind the instantiated processes to the specified port; or default to 4000
     */
    app.listen({ hostname: "0.0.0.0", port: process.env.PORT || 7101 }, () => {
      console.log(
        `🚀 ${process.env.npm_package_name} (v${
          process.env.npm_package_version
        }) ready on port ${process.env.PORT || 7101}`
      );
    });
  } catch (error) {
    console.error(error);
  }
};
