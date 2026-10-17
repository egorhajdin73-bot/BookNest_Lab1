export function filterBooks(books, query, genre, onlyAvailable) {
  const lowerQuery = query.toLowerCase().trim();
  
  return books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(lowerQuery) || 
                          book.author.toLowerCase().includes(lowerQuery);
    const matchesGenre = genre ? book.genre === genre : true;
    const matchesAvailable = onlyAvailable ? book.available : true;
    
    return matchesSearch && matchesGenre && matchesAvailable;
  });
}

export function sortBooks(books, sortBy) {
  // Создаем копию массива, чтобы не мутировать исходные данные (правило из задания)
  const sorted = [...books];
  
  switch (sortBy) {
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'title-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case 'year-desc':
      return sorted.sort((a, b) => b.year - a.year);
    case 'year-asc':
      return sorted.sort((a, b) => a.year - b.year);
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
}