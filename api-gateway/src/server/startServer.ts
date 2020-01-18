import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { resolvers } from "../graphql/resolvers";
import { typeDefs } from "../graphql/typeDefs";
import { formatGraphQLErrors } from "./formatGraphQLErrors";

export const startServer = async () => {
  try {
    const apolloServer = new ApolloServer({
      formatError: formatGraphQLErrors,
      resolvers,
      typeDefs
    });

    const app = express();

    app.use(cookieParser());

    app.use(
      cors({
        origin: (_, cb) => cb(null, true),
        credentials: true
      })
    );

    apolloServer.applyMiddleware({
      app,
      cors: false,
      path: `/graphql`
    });

    app.listen({ hostname: "0.0.0.0", port: process.env.PORT || 7000 }, () => {
      console.log(
        `🚀 ${process.env.npm_package_name} (v${
          process.env.npm_package_version
        }) ready on port ${process.env.PORT || 7000}`
      );
    });
  } catch (error) {
    console.error(error);
  }
};
