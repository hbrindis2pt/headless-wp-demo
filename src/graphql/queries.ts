import { gql } from "graphql-request";

export const GET_POSTS = gql`
  query GetPosts {
    posts(first: 10) {
      nodes {
        id
        databaseId
        title
        slug
        date
        excerpt
      }
    }
  }
`;