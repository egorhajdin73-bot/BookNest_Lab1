import React from 'react';
import type { ApiBook } from '../types';
import { BookCard } from './BookCard';

interface BookListProps {
  books: ApiBook[];
  wishlist: string[];
  onToggleWishlist: (key: string) => void;
}

export const BookList: React.FC<BookListProps> = ({ books, wishlist, onToggleWishlist }) => {
  return (
    <div className="book-grid">
      {books.map(book => (
        <BookCard 
          key={book.key} 
          book={book} 
          isSaved={wishlist.includes(book.key)} 
          onToggleWishlist={onToggleWishlist} 
        />
      ))}
    </div>
  );
};