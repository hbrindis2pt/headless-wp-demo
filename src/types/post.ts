export interface Post {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  uri: string;
  date: string;
  excerpt: string;

  author: {
    node: {
      name: string;
      uri: string;
    };
  } | null;

  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  } | null;

  categories: {
    nodes: {
      name: string;
      slug: string;
      uri: string;
    }[];
  };
}

export interface GetPostsResponse {
  posts: {
    nodes: Post[];
  };
}

export interface GetPaywalledPostsResponse {
  paywalledPosts: {
    nodes: Post[];
  };
}

export interface GetPremiumPostsResponse {
  premiumPosts: {
    nodes: Post[];
  };
}