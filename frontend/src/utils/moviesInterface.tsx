export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  description: string;
  budget: number;
  releaseDate: string;
  duration: number;
  genre: string;
  imageUrl: string | undefined;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface MovieFormData {
  title: string;
  originalTitle: string;
  description?: string;
  tagline?: string;
  budget?: number;
  revenue?: number;
  popularity?: number;
  voteCount?: number;
  language: string;
  status: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  releaseDate: any;
  duration?: number;
  genre: string;
  youtubeUrl?: string;
  imageUrl?: string;
}

export interface EditFormMovie extends MovieFormData {
  id: number;
}

export interface MoviesResponse {
  movies: Movie[];
  totalMovies: number;
  totalPages: number;
  currentPage: number;
}
