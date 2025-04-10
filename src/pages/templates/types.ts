
export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  updatedAt: Date;
  author: {
    name: string;
    avatar?: string;
  };
}
