export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const BASE_URL = 'https://openlibrary.org';

export async function fetchData<T>(
  endpoint: string, 
  params: Record<string, string | number | undefined> = {}, 
  signal: AbortSignal | null = null
): Promise<T> {
  const url = new URL(endpoint, BASE_URL);
  
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
      url.searchParams.append(key, String(params[key]));
    }
  });

  const response = await fetch(url.toString(), { signal });

  if (!response.ok) {
    throw new ApiError(`Ошибка сервера: ${response.status}`, response.status);
  }

  return response.json() as Promise<T>;
}