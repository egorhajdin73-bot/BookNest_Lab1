export interface ApiBook {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

export interface ApiSearchResponse {
  docs: ApiBook[];
  numFound: number;
}

export type AppStatus = 'idle' | 'loading' | 'success' | 'empty' | 'error';
export type ErrorType = 'network' | '4xx' | '5xx' | '';