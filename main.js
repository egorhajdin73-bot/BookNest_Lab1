import { searchBooks } from './api/books.js';
import { ApiError } from './api/client.js';
import { renderBooks } from './ui/render.js';

let savedWishlist = [];
try {
  const stored = localStorage.getItem('booknest-wishlist');
  if (stored) savedWishlist = JSON.parse(stored);
} catch (e) {
  console.warn('Ошибка чтения localStorage', e);
}

const state = {
  query: 'javascript',
  page: 1,
  wishlist: savedWishlist,
  status: 'idle',
  errorType: '', 
  books: [],
  totalResults: 0
};

let controller = null;
let debounceTimer = null;

const container = document.querySelector('#book-grid');
const searchInput = document.querySelector('#search');
const form = document.querySelector('#filter-form');
const countEl = document.querySelector('#wishlist-count');

const loader = document.querySelector('#loader');
const errorBox = document.querySelector('#error-box');
const errorMsg = document.querySelector('#error-msg');
const retryBtn = document.querySelector('#retry-btn');
const emptyBox = document.querySelector('#empty-box');
const pagination = document.querySelector('#pagination');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
const pageInfo = document.querySelector('#page-info');

function updateUI() {
  loader.classList.add('hidden');
  errorBox.classList.add('hidden');
  emptyBox.classList.add('hidden');
  container.classList.add('hidden');
  pagination.classList.add('hidden');

  if (state.status === 'loading') {
    loader.classList.remove('hidden');
  } else if (state.status === 'error') {
    errorBox.classList.remove('hidden');
    if (state.errorType === 'network') {
      errorMsg.textContent = 'Нет подключения к интернету. Проверьте сеть.';
    } else if (state.errorType === '4xx') {
      errorMsg.textContent = 'Ошибка запроса. Проверьте поисковый запрос.';
    } else if (state.errorType === '5xx') {
      errorMsg.textContent = 'Сервер временно недоступен. Попробуйте позже.';
    }
  } else if (state.status === 'empty') {
    emptyBox.classList.remove('hidden');
  } else if (state.status === 'success') {
    container.classList.remove('hidden');
    pagination.classList.remove('hidden');
    
    pageInfo.textContent = `Страница ${state.page}`;
    prevBtn.disabled = state.page <= 1;
    nextBtn.disabled = state.books.length < 20;
    
    renderBooks(state.books, container, state.wishlist);
  }
  
  countEl.textContent = state.wishlist.length;
}

async function loadBooks() {
  if (controller) controller.abort();
  controller = new AbortController();
  
  state.status = 'loading';
  updateUI();

  try {
    const data = await searchBooks(state.query, state.page, controller.signal);
    
    if (data.docs && data.docs.length > 0) {
      state.books = data.docs;
      state.status = 'success';
    } else {
      state.status = 'empty';
    }
  } catch (error) {
    if (error.name === 'AbortError') return; 
    
    state.status = 'error';
    if (error instanceof ApiError) {
      state.errorType = error.status >= 500 ? '5xx' : '4xx';
    } else {
      state.errorType = 'network';
    }
  } 
  
  if (!controller.signal.aborted) {
    updateUI();
  }
}

searchInput.addEventListener('input', (e) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    state.query = e.target.value.trim();
    state.page = 1; 
    if (state.query.length >= 2) {
      loadBooks();
    }
  }, 300); 
});

form.addEventListener('submit', (e) => e.preventDefault());
retryBtn.addEventListener('click', loadBooks);

prevBtn.addEventListener('click', () => {
  if (state.page > 1) {
    state.page--;
    loadBooks();
  }
});

nextBtn.addEventListener('click', () => {
  if (state.books.length === 20) {
    state.page++;
    loadBooks();
  }
});

container.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-wishlist');
  if (!btn) return;
  const bookId = btn.dataset.id;
  
  if (state.wishlist.includes(bookId)) {
    state.wishlist = state.wishlist.filter(id => id !== bookId);
  } else {
    state.wishlist.push(bookId);
  }
  localStorage.setItem('booknest-wishlist', JSON.stringify(state.wishlist));
  updateUI();
});

loadBooks();