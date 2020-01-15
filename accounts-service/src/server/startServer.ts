import bodyParser from "body-parser"
import cors from "cors"
import express from "express"
import { createConnection } from "typeorm"
import { setupRoutes } from "../routes"

require("dotenv").config()

export const startServer = async () => {
  try {
    /**
     * Create a connection with the database
     */
    console.log(process.env.TYPEORM_URL)
    const database = await createConnection({
      name: "default",
      type: "mysql",
      entities: [__dirname + "/database/entities/**/*.{ts,js}"],
      synchronize: true,
      // logging: true,
    })

    if (database.isConnected === true) {
      console.log("Successfully connected to database")
    }
    /**
     * Initialize the Express Server
     */
    const app = express()

    /**
     * Express Middleware to enable CORS
     */
    app.use(cors())

    /**
     * Express Middleware for parsing POST/PUT/DELETE body contents
     */
    app.use(bodyParser.json())

    /**
     * Bind the routes to the Express Server
     */
    setupRoutes(app)

    /**
     * Bind the instantiated processes to the specified port; or default to 4000
     */
    app.listen({ port: process.env.PORT || 4000 }, () => {
      console.log(
        `🚀 ${process.env.npm_package_name} (v${
          process.env.npm_package_version
        }) ready on port ${process.env.PORT || 4000}`
      )
    })
  } catch (error) {
    console.error(error)
  }
}
