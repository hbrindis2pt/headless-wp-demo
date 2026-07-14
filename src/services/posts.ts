import { wordpressClient } from "./wordpress.js";
import { GET_POSTS } from "../graphql/queries.js";
import type { GetPostsResponse, Post } from "../types/post.js";

export async function getPosts(): Promise<Post[]> {
  const data = await wordpressClient.request<GetPostsResponse>(
    GET_POSTS
  );

  return data.posts.nodes;
}