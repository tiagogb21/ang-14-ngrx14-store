interface Photos {
  name: string;
  url: string;
  _id?: string;
}

export interface Products {
  _id?: string;
  title: string;
  description: string;
  photos: Photos;
  genres: string[];
  platforms: string[];
  tags: string[];
  rating: number;
  totalVotes: number;
  videos: string[];
  createdAt: string;
  updatedAt: string;
  _v: number;
  mediumPrice: number;
  releaseYear: number;
}
