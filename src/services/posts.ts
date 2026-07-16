import { wordpressClient } from "./wordpress.js";
import {
  GET_POSTS,
  GET_POSTS_BY_CATEGORY,
} from "../graphql/queries.js";

import type {
  GetPostsResponse,
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