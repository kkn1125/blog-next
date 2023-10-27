import { MDXRemoteSerializeResult } from "next-mdx-remote";

interface PostData {
  slug: `/${string}/`;
  date: string;
  modified: string;
  title: string;
  author: string;
  categories: string[];
  image: string;
  tags: string[];
  description: string;
  featured: string;
  rating: number;
  profile: string;
  published: boolean;
}

export declare interface Article
  extends MDXRemoteSerializeResult<Record<string, unknown>, PostData> {
  readingTime?: string;
  originPath?: string;
  content?: string;
}

export declare interface PostData extends Article {
  publishedAt?: string;
  excerpt?: string;
}
