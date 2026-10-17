export function renderBooks(books, container, wishlist) {
  container.innerHTML = ''; // Очищаем контейнер

  if (books.length === 0) {
    container.innerHTML = '<p>По вашему запросу ничего не найдено. Попробуйте изменить фильтры.</p>';
    return;
  }

  books.forEach(book => {
    const article = document.createElement('article');
    article.className = 'card';

    const title = document.createElement('h3');
    title.textContent = book.title;
    
    const author = document.createElement('p');
    author.textContent = `Автор: ${book.author}`;
    
    const year = document.createElement('p');
    year.textContent = `Год: ${book.year}`;
    
    const rating = document.createElement('p');
    rating.textContent = `Рейтинг: ${book.rating}`;
    
    const status = document.createElement('p');
    status.textContent = book.available ? 'Доступна' : 'Выдана';
    status.style.color = book.available ? 'green' : 'red';

    // Проверяем, есть ли книга в списке желаемого
    const isSaved = wishlist.includes(book.id);

    const btn = document.createElement('button');
    btn.className = isSaved ? 'btn btn--secondary' : 'btn';
    btn.textContent = isSaved ? 'В списке' : 'Хочу прочитать';
    btn.setAttribute('data-id', book.id); 
    btn.setAttribute('aria-pressed', isSaved ? 'true' : 'false');
    
    // Добавляем класс для делегирования событий
    btn.classList.add('btn-wishlist'); 

    const content = document.createElement('div');
    content.className = 'card__content';
    content.append(title, author, year, rating, status);

    const actions = document.createElement('div');
    actions.className = 'card__actions';
    actions.append(btn);

    article.append(content, actions);
    container.append(article);
  });
}