export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: {
    title: string;
    description: string;
    url: string;
    width: number;
    height: number;
  };
  content?: any;
}
