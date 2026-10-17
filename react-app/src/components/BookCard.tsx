import React from 'react';
import type { ApiBook } from '../types';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

interface BookCardProps {
  book: ApiBook;
  isSaved: boolean;
  onToggleWishlist: (key: string) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, isSaved, onToggleWishlist }) => {
  return (
    <article className="card">
      <img 
        src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'https://placehold.co/240x340?text=Нет+обложки'} 
        alt={`Обложка книги ${book.title}`} 
        width={240} 
        height={340} 
      />
      <div className="card__content">
        <h3>{book.title}</h3>
        <p>Автор: {book.author_name ? book.author_name[0] : 'Неизвестен'}</p>
        <p>Год: {book.first_publish_year || '—'}</p>
        <p>Статус: <Badge color="green">В наличии</Badge></p>
      </div>
      <div className="card__actions">
        <Button variant={isSaved ? 'secondary' : 'primary'} onClick={() => onToggleWishlist(book.key)}>
          {isSaved ? 'В списке' : 'Хочу прочитать'}
        </Button>
      </div>
    </article>
  );
};