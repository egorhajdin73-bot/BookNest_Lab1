const BASE_URL = 'https://openlibrary.org';

// Класс ошибки с полем status (требование задания)
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function fetchData(endpoint, params = {}, signal = null) {
  const url = new URL(endpoint, BASE_URL);
  // Безопасная сборка query-параметров
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
      url.searchParams.append(key, params[key]);
    }
  });

  const response = await fetch(url, { signal });

  // Обязательная проверка response.ok
  if (!response.ok) {
    throw new ApiError(`Ошибка сервера: ${response.status}`, response.status);
  }

  return response.json();
}