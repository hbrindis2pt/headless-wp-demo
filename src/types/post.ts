export interface Post {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
}

export interface GetPostsResponse {
  posts: {
    nodes: Post[];
  };
}