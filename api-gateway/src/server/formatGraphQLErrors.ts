import get from "lodash/get";
import { GraphQLError } from "graphql";

export const formatGraphQLErrors = (error: GraphQLError) => {
  const errorDetails = get(error, "originalError.response.body");

  try {
    if (errorDetails) return JSON.parse(errorDetails);
  } catch (e) {}

  return error;
};
