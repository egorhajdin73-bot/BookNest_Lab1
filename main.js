import { books } from './data/books.js';
import { filterBooks, sortBooks } from './lib/books.js';
import { renderBooks } from './ui/render.js';

// Безопасно читаем список из localStorage (try/catch)
let savedWishlist = [];
try {
  const stored = localStorage.getItem('booknest-wishlist');
  if (stored) savedWishlist = JSON.parse(stored);
} catch (e) {
  console.warn('Ошибка чтения localStorage', e);
}

// Единый объект состояния (State)
const state = {
  searchQuery: '',
  genre: '',
  sortBy: 'title-asc',
  onlyAvailable: false,
  wishlist: savedWishlist // Массив ID книг в списке желаемого
};

const container = document.querySelector('.book-grid');
const searchInput = document.querySelector('#search');
const genreSelect = document.querySelector('#genre');
const sortSelect = document.querySelector('#sort');
const availableCheck = document.querySelector('#available');
const form = document.querySelector('#filter-form');
const countEl = document.querySelector('#wishlist-count');

// Функция обновления интерфейса на основе состояния
function updateUI() {
  // Фильтруем и сортируем
  const filtered = filterBooks(books, state.searchQuery, state.genre, state.onlyAvailable);
  const sorted = sortBooks(filtered, state.sortBy);
  
  // Отрисовываем карточки, передавая им список желаемого
  renderBooks(sorted, container, state.wishlist);

  // Обновляем счетчик в шапке
  countEl.textContent = state.wishlist.length;
}

// --- СЛУШАТЕЛИ СОБЫТИЙ ---

// Поиск
searchInput.addEventListener('input', (e) => {
  state.searchQuery = e.target.value;
  updateUI();
});

// Жанр
genreSelect.addEventListener('change', (e) => {
  state.genre = e.target.value;
  updateUI();
});

// Сортировка
sortSelect.addEventListener('change', (e) => {
  state.sortBy = e.target.value;
  updateUI();
});

// Чекбокс "Только доступные"
availableCheck.addEventListener('change', (e) => {
  state.onlyAvailable = e.target.checked;
  updateUI();
});

// Сброс формы
form.addEventListener('reset', () => {
  // Даем браузеру время сбросить поля, затем очищаем стейт
  setTimeout(() => {
    state.searchQuery = '';
    state.genre = '';
    state.onlyAvailable = false;
    updateUI();
  }, 0);
});

// Отправка формы (запрещаем перезагрузку)
form.addEventListener('submit', (e) => {
  e.preventDefault();
});

// ДЕЛЕГИРОВАНИЕ СОБЫТИЙ: Клик по кнопке "Хочу прочитать"
container.addEventListener('click', (e) => {
  // Проверяем, был ли клик именно по кнопке (или по её дочернему элементу)
  const btn = e.target.closest('.btn-wishlist');
  if (!btn) return;

  const bookId = Number(btn.dataset.id);

  // Если книга уже в списке — удаляем, если нет — добавляем
  if (state.wishlist.includes(bookId)) {
    state.wishlist = state.wishlist.filter(id => id !== bookId);
  } else {
    state.wishlist.push(bookId);
  }

  // Сохраняем обновленный список в localStorage
  localStorage.setItem('booknest-wishlist', JSON.stringify(state.wishlist));

  // Перерисовываем интерфейс, чтобы кнопка обновилась
  updateUI();
});

// Первый запуск при загрузке страницы
updateUI();