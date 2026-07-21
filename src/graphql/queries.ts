import { gql } from "graphql-request";

const POST_CARD_FIELDS = gql`
  fragment PostCardFields on Post {
    id
    databaseId
    title
    slug
    uri
    date
    excerpt

    author {
      node {
        name
        uri
      }
    }

    featuredImage {
      node {
        sourceUrl(size: MEDIUM)
        altText
      }
    }

    categories {
      nodes {
        name
        slug
        uri
      }
    }
  }
`;

export const GET_POSTS = gql`
  ${POST_CARD_FIELDS}

  query GetPosts($first: Int = 10) {
    posts(first: $first) {
      nodes {
        ...PostCardFields
      }
    }
  }
`;

export const GET_POSTS_BY_CATEGORY = gql`
  ${POST_CARD_FIELDS}

  query GetPostsByCategory(
    $category: String!
    $first: Int = 5
  ) {
    posts(
      first: $first
      where: {
        categoryName: $category
      }
    ) {
      nodes {
        ...PostCardFields
      }
    }
  }
`;


const PAYWALLED_CARD_FIELDS = gql`
  fragment PaywalledCardFields on PaywalledPost {
    id
    databaseId
    title
    slug
    uri
    date
    excerpt

    author {
      node {
        name
        uri
      }
    }

    featuredImage {
      node {
        sourceUrl(size: MEDIUM)
        altText
      }
    }

    categories {
      nodes {
        name
        slug
        uri
      }
    }
  }
`;

const PREMIUM_CARD_FIELDS = gql`
  fragment PremiumCardFields on PremiumPost {
    id
    databaseId
    title
    slug
    uri
    date
    excerpt

    author {
      node {
        name
        uri
      }
    }

    featuredImage {
      node {
        sourceUrl(size: MEDIUM)
        altText
      }
    }

    categories {
      nodes {
        name
        slug
        uri
      }
    }
  }
`;

export const GET_PAYWALLED_POSTS = gql`
  ${PAYWALLED_CARD_FIELDS}

  query GetPaywalledPosts($first: Int = 4) {
    paywalledPosts(first: $first) {
      nodes {
        ...PaywalledCardFields
      }
    }
  }
`;

export const GET_PREMIUM_POSTS = gql`
  ${PREMIUM_CARD_FIELDS}

  query GetPremiumPosts($first: Int = 4) {
    premiumPosts(first: $first) {
      nodes {
        ...PremiumCardFields
      }
    }
  }
`;