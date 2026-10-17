export function renderBooks(books, container, wishlist) {
  container.innerHTML = ''; 

  books.forEach(book => {
    const article = document.createElement('article');
    article.className = 'card';

    const title = document.createElement('h3');
    title.textContent = book.title || 'Без названия';
    
    const author = document.createElement('p');
    author.textContent = `Автор: ${book.author_name ? book.author_name[0] : 'Неизвестен'}`;
    
    const year = document.createElement('p');
    year.textContent = `Год: ${book.first_publish_year || '—'}`;

    const img = document.createElement('img');
    img.src = book.cover_i 
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` 
      : 'https://placehold.co/240x340?text=Нет+обложки';
    img.alt = `Обложка книги ${book.title}`;
    img.width = 240;
    img.height = 340;

    const isSaved = wishlist.includes(book.key);
    const btn = document.createElement('button');
    btn.className = isSaved ? 'btn btn--secondary btn-wishlist' : 'btn btn-wishlist';
    btn.textContent = isSaved ? 'В списке' : 'Хочу прочитать';
    btn.setAttribute('data-id', book.key); 
    btn.setAttribute('aria-pressed', isSaved ? 'true' : 'false');

    const content = document.createElement('div');
    content.className = 'card__content';
    content.append(title, author, year);

    const actions = document.createElement('div');
    actions.className = 'card__actions';
    actions.append(btn);

    article.append(img, content, actions);
    container.append(article);
  });
}