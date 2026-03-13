export interface Post {
  id: string;
  title: string;
  date: string; // ISO format
  tags: string[];
  excerpt: string;
  content: string; // Markdown
}
