export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  description: string;
  budget: number;
  releaseDate: string;
  duration: number;
  genre: string;
  status: string;
  tagline: string;
  popularity: number;
  revenue: number;
  voteCount: number;
  imageUrl: string;
  youtubeUrl: string;
  userId: number;
  createdAt: string;
  language: string;
  successRate: number;
  updatedAt: string;
}

export interface MovieFormData {
  title: string;
  originalTitle: string;
  description: string;
  tagline: string;
  budget: number;
  revenue: number;
  popularity: number;
  voteCount: number;
  language: string;
  status: string;
  releaseDate: string;
  duration: number;
  genre: string;
  youtubeUrl: string;
  imageUrl: string;
}

export interface EditFormMovie extends MovieFormData {
  id?: number;
}

export interface MoviesResponse {
  movies: Movie[];
  totalMovies: number;
  totalPages: number;
  currentPage: number;
}
