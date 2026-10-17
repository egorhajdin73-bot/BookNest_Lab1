import { fetchData } from './client';
import type { ApiSearchResponse } from '../types';

export async function searchBooks(query: string, page: number = 1, signal: AbortSignal | null = null): Promise<ApiSearchResponse> {
  const limit = 20;
  
  return fetchData<ApiSearchResponse>('/search.json', {
    q: query,
    page: page,
    limit: limit,
    fields: 'key,title,author_name,first_publish_year,cover_i' 
  }, signal);
}