import { fetchData } from './client.js';

export async function searchBooks(query, page = 1, signal = null) {
  const limit = 20; // 20 записей на страницу
  
  return fetchData('/search.json', {
    q: query,
    page: page,
    limit: limit,
    fields: 'key,title,author_name,first_publish_year,cover_i' 
  }, signal);
}