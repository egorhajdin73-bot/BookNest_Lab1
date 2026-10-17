import { useState, useEffect } from 'react';
import { searchBooks } from './api/books';
import { ApiError } from './api/client';
import type { ApiBook, AppStatus, ErrorType } from './types';

import { FiltersPanel } from './components/FiltersPanel';
import { BookList } from './components/BookList';
import { Spinner } from './components/ui/Spinner';
import { ErrorBox } from './components/ui/ErrorBox';
import { EmptyState } from './components/ui/EmptyState';
import { Button } from './components/ui/Button';

export default function App() {
  const [query, setQuery] = useState('javascript'); 
  const [debouncedQuery, setDebouncedQuery] = useState(query); 
  const [page, setPage] = useState(1);
  const [retryCount, setRetryCount] = useState(0); // Для кнопки "Повторить"
  
  const [books, setBooks] = useState<ApiBook[]>([]);
  const [status, setStatus] = useState<AppStatus>('idle');
  const [errorType, setErrorType] = useState<ErrorType>('');
  
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('booknest-wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Сохранение в LocalStorage
  useEffect(() => {
    localStorage.setItem('booknest-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Загрузка данных
  useEffect(() => {
    if (debouncedQuery.length < 2) return;

    const controller = new AbortController();
    
    const fetchData = async () => {
      setStatus('loading');
      setErrorType('');
      
      try {
        const data = await searchBooks(debouncedQuery, page, controller.signal);
        if (data.docs && data.docs.length > 0) {
          setBooks(data.docs);
          setStatus('success');
        } else {
          setBooks([]);
          setStatus('empty');
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;
        
        setStatus('error');
        if (error instanceof ApiError) {
          setErrorType(error.status >= 500 ? '5xx' : '4xx');
        } else {
          setErrorType('network');
        }
      }
    };

    fetchData();
    return () => controller.abort(); 
  }, [debouncedQuery, page, retryCount]);

  const toggleWishlist = (key: string) => {
    setWishlist(prev => 
      prev.includes(key) ? prev.filter(id => id !== key) : [...prev, key]
    );
  };

  const retry = () => setRetryCount(c => c + 1);

  return (
    <>
      <header className="site-header">
        <p><a href="/">BookNest</a></p>
        <nav aria-label="Основная навигация">
          <ul className="nav-list">
            <li><a href="/">Каталог</a></li>
            <li><a href="/book.html">О книге</a></li>
            <li><a href="/loan.html">Получить книгу</a></li>
            <li><a href="#" style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>Мой список ({wishlist.length})</a></li>
          </ul>
        </nav>
      </header>

      <main className="main-content container">
        <h1>Каталог книг</h1>
        
        <div className="main-layout">
          <aside>
            <FiltersPanel 
              query={query} 
              setQuery={setQuery} 
              onlyAvailable={false} 
              setOnlyAvailable={() => {}} 
            />
          </aside>

          <section>
            <h2>Книги в каталоге</h2>
            
            {status === 'loading' && <Spinner />}
            
            {status === 'error' && (
              <ErrorBox 
                message={
                  errorType === 'network' ? 'Нет подключения к интернету.' :
                  errorType === '4xx' ? 'Ошибка запроса. Проверьте ввод.' :
                  'Сервер временно недоступен.'
                } 
                onRetry={retry} 
              />
            )}
            
            {status === 'empty' && <EmptyState />}
            
            {status === 'success' && (
              <>
                <BookList books={books} wishlist={wishlist} onToggleWishlist={toggleWishlist} />
                
                <div className="pagination">
                  <Button variant="secondary" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Назад</Button>
                  <span>Страница {page}</span>
                  <Button variant="secondary" disabled={books.length < 20} onClick={() => setPage(p => p + 1)}>Вперед</Button>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </>
  );
}