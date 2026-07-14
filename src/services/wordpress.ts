import { GraphQLClient } from "graphql-request";
import { config } from "../config.js";

export const wordpressClient = new GraphQLClient(
  config.wpEndpoint
);