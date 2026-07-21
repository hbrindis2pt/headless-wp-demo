import { wordpressClient } from "./wordpress.js";
import {
  GET_POSTS,
  GET_POSTS_BY_CATEGORY,
  GET_PAYWALLED_POSTS,
  GET_PREMIUM_POSTS,
} from "../graphql/queries.js";

import type {
  GetPostsResponse,
  GetPaywalledPostsResponse,
  GetPremiumPostsResponse,
  Post,
} from "../types/post.js";

export async function getPosts(
  first = 10,
): Promise<Post[]> {
  const data =
    await wordpressClient.request<GetPostsResponse>(
      GET_POSTS,
      { first },
    );

  return data.posts.nodes;
}

export async function getPostsByCategory(
  category: string,
  first = 5,
): Promise<Post[]> {
  const data =
    await wordpressClient.request<GetPostsResponse>(
      GET_POSTS_BY_CATEGORY,
      {
        category,
        first,
      },
    );

  return data.posts.nodes;
}

export async function getPaywalledPosts(
  first = 4,
): Promise<Post[]> {
  const data =
    await wordpressClient.request<GetPaywalledPostsResponse>(
      GET_PAYWALLED_POSTS,
      { first },
    );

  return data.paywalledPosts.nodes;
}

export async function getPremiumPosts(
  first = 4,
): Promise<Post[]> {
  const data =
    await wordpressClient.request<GetPremiumPostsResponse>(
      GET_PREMIUM_POSTS,
      { first },
    );

  return data.premiumPosts.nodes;
}