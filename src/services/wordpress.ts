import { GraphQLClient } from "graphql-request";

export const wp = new GraphQLClient(
    process.env.WP_ENDPOINT!
);
