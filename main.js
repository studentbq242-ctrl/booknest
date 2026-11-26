// 41. let, const, деректер түрлері және console.log
const STORAGE_THEME_KEY = "booknest_theme";
const siteName = "BookNest";
let activeGenre = "Барлығы";
let searchQuery = "";
let sortBy = "default";
let lastFocusedElement = null;

console.log(`${siteName} JS іске қосылды`);

// 42. 12 кітаптан тұратын массив (id, title, author, genre, year, price, rating, cover)
const books = [
  {
    id: 1,
    title: "Абай жолы",
    author: "Мұхтар Әуезов",
    genre: "Классика",
    year: 1942,
    price: 4500,
    rating: 5,
    cover: "images/book1.jpg"
  },
  {
    id: 2,
    title: "Атомдық әдеттер",
    author: "Джеймс Клир",
    genre: "Психология",
    year: 2018,
    price: 5200,
    rating: 4.9,
    cover: "images/book2.jpg"
  },
  {
    id: 3,
    title: "Көшпенділер",
    author: "Ілияс Есенберлин",
    genre: "Тарих",
    year: 1976,
    price: 4800,
    rating: 4.8,
    cover: "images/book3.jpg"
  },
  {
    id: 4,
    title: "1984",
    author: "Джордж Оруэлл",
    genre: "Классика",
    year: 1949,
    price: 3700,
    rating: 4.7,
    cover: "images/book1.jpg"
  },
  {
    id: 5,
    title: "Сапиенс: Адамзаттың қысқаша тарихы",
    author: "Юваль Ной Харари",
    genre: "Тарих",
    year: 2011,
    price: 6100,
    rating: 4.9,
    cover: "images/book2.jpg"
  },
  {
    id: 6,
    title: "Дюна",
    author: "Фрэнк Герберт",
    genre: "Фэнтези",
    year: 1965,
    price: 5600,
    rating: 4.6,
    cover: "images/book3.jpg"
  },
  {
    id: 7,
    title: "Сақиналар әміршісі",
    author: "Дж. Р. Р. Толкин",
    genre: "Фэнтези",
    year: 1954,
    price: 6400,
    rating: 4.9,
    cover: "images/book1.jpg"
  },
  {
    id: 8,
    title: "Ойлау, жүйелі және баяу",
    author: "Даниэль Канеман",
    genre: "Психология",
    year: 2011,
    price: 5400,
    rating: 4.7,
    cover: "images/book2.jpg"
  },
  {
    id: 9,
    title: "Ұшқан ұя",
    author: "Бауыржан Момышұлы",
    genre: "Тарих",
    year: 1974,
    price: 3900,
    rating: 4.8,
    cover: "images/book3.jpg"
  },
  {
    id: 10,
    title: "Кішкентай ханзада",
    author: "Антуан де Сент-Экзюпери",
    genre: "Классика",
    year: 1943,
    price: 3200,
    rating: 4.9,
    cover: "images/book1.jpg"
  },
  {
    id: 11,
    title: "Гарри Поттер және пәлсапа тас",
    author: "Дж. К. Роулинг",
    genre: "Фэнтези",
    year: 1997,
    price: 4300,
    rating: 4.8,
    cover: "images/book2.jpg"
  },
  {
    id: 12,
    title: "Қазақ хандығының тарихы",
    author: "Мұхтар Мағауин",
    genre: "Деректі кітап",
    year: 1992,
    price: 4900,
    rating: 4.7,
    cover: "images/book3.jpg"
  }
];

// DOM элементтерін табу
const menuToggle = document.querySelector(".menu-toggle");
const navList = document.querySelector(".nav-list");
const themeToggle = document.querySelector("#theme-toggle");
const catalogContainer = document.querySelector("#catalog-grid") || document.querySelector(".cards-grid");
const searchInput = document.querySelector("#book-search");
const genreChipsContainer = document.querySelector("#genre-chips");
const sortSelect = document.querySelector("#book-sort");
const resultsCountEl = document.querySelector("#results-count");
const modalOverlay = document.querySelector("#book-modal");
const modalBody = document.querySelector("#modal-body");
const modalCloseBtn = document.querySelector("#modal-close");

// 44. Гамбургер мәзірді JS арқылы ашу және жабу
function setMenuOpen(isOpen) {
  if (!menuToggle || !navList) return;
  navList.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
}

if (menuToggle && navList) {
  menuToggle.addEventListener("click", () => {
    const willOpen = !navList.classList.contains("is-open");
    setMenuOpen(willOpen);
  });

  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });
}

// 45. Қараңғы/ашық тақырып ауыстырғышы және localStorage
function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark", isDark);
  if (themeToggle) {
    themeToggle.textContent = isDark ? "☀️ Ашық" : "🌙 Қараңғы";
    themeToggle.setAttribute("aria-pressed", String(isDark));
  }
}

const savedTheme = localStorage.getItem(STORAGE_THEME_KEY) || "light";
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
    localStorage.setItem(STORAGE_THEME_KEY, nextTheme);
    applyTheme(nextTheme);
  });
}

// 47. Жанр чиптерін шығару
function renderGenreChips() {
  if (!genreChipsContainer) return;
  const genres = ["Барлығы", ...new Set(books.map((book) => book.genre))];

  genreChipsContainer.innerHTML = genres
    .map(
      (genre) => `
      <button type="button" class="chip ${genre === activeGenre ? "is-active" : ""}" data-genre="${genre}">
        ${genre}
      </button>
    `
    )
    .join("");

  genreChipsContainer.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      activeGenre = chip.dataset.genre;
      renderGenreChips();
      updateCatalog();
    });
  });
}

// Сүзгілеу және сұрыптау логикасы (46, 47, 48)
function getFilteredAndSortedBooks() {
  const query = searchQuery.trim().toLowerCase();

  let filtered = books.filter((book) => {
    const matchesGenre = activeGenre === "Барлығы" || book.genre === activeGenre;
    const matchesSearch =
      !query ||
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query);
    return matchesGenre && matchesSearch;
  });

  if (sortBy === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating-desc") {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  return filtered;
}

// 49. Нәтиже санын және бос күйді көрсету
function updateResultsCount(count) {
  if (!resultsCountEl) return;
  resultsCountEl.textContent = count === 0 ? "Кітаптар табылмады" : `${count} кітап табылды`;
}

function resetFilters() {
  activeGenre = "Барлығы";
  searchQuery = "";
  sortBy = "default";
  if (searchInput) searchInput.value = "";
  if (sortSelect) sortSelect.value = "default";
  renderGenreChips();
  updateCatalog();
}

// 43. renderBooks() функциясы: карточкалар массивтен шығарылады
function renderBooks(items) {
  if (!catalogContainer) return;

  if (items.length === 0) {
    catalogContainer.innerHTML = `
      <div class="empty-state">
        <p>Іздеу немесе сүзгі бойынша ешқандай кітап табылмады.</p>
        <button type="button" class="btn" id="reset-filters-btn">Сүзгілерді тазалау</button>
      </div>
    `;
    const resetBtn = document.querySelector("#reset-filters-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", resetFilters);
    }
    return;
  }

  catalogContainer.innerHTML = items
    .map(
      (book) => `
      <article class="card" tabindex="0" data-book-id="${book.id}" aria-label="${book.title}, ${book.author}">
        ${book.year >= 2015 ? '<span class="badge-new">Жаңа</span>' : ""}
        <div class="book-media">
          <img src="${book.cover}" alt="${book.title} кітабының мұқабасы" loading="lazy">
        </div>
        <span class="book-genre">${book.genre}</span>
        <h3>${book.title}</h3>
        <p class="author">${book.author} (${book.year})</p>
        <p class="rating-text">⭐ ${book.rating} / 5</p>
        <p class="price">${book.price.toLocaleString("kk-KZ")} ₸</p>
        <button type="button" class="btn-outline open-modal-btn" data-book-id="${book.id}">Толығырақ</button>
      </article>
    `
    )
    .join("");
}

function updateCatalog() {
  const result = getFilteredAndSortedBooks();
  updateResultsCount(result.length);
  renderBooks(result);
}

// 50 & 51. Модальды терезені ашу және жабу (батырма, фон, Esc, фокус)
function openBookModal(bookId, triggerEl) {
  if (!modalOverlay || !modalBody) return;
  const book = books.find((item) => item.id === Number(bookId));
  if (!book) return;

  lastFocusedElement = triggerEl || document.activeElement;

  modalBody.innerHTML = `
    <div class="modal-book-details">
      <img src="${book.cover}" alt="${book.title} мұқабасы">
      <div>
        <span class="book-genre">${book.genre}</span>
        <h2>${book.title}</h2>
        <p><strong>Автор:</strong> ${book.author}</p>
        <p><strong>Шыққан жылы:</strong> ${book.year}</p>
        <p><strong>Рейтинг:</strong> ⭐ ${book.rating} / 5</p>
        <p class="price">${book.price.toLocaleString("kk-KZ")} ₸</p>
        <p>Бұл кітап BookNest каталогында қолжетімді және оқу клубының ұсынылатын тізіміне кіреді.</p>
      </div>
    </div>
  `;

  modalOverlay.classList.add("is-open");
  modalOverlay.setAttribute("aria-hidden", "false");
  if (modalCloseBtn) {
    modalCloseBtn.focus();
  }
}

function closeBookModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove("is-open");
  modalOverlay.setAttribute("aria-hidden", "true");
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

if (catalogContainer) {
  catalogContainer.addEventListener("click", (event) => {
    const card = event.target.closest("[data-book-id]");
    if (!card) return;
    openBookModal(card.dataset.bookId, event.target.closest("button") || card);
  });

  catalogContainer.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const card = event.target.closest(".card[data-book-id]");
      if (card) {
        openBookModal(card.dataset.bookId, card);
      }
    }
  });
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", closeBookModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeBookModal();
    }
  });
}

// Esc пернесімен мәзірді және модальды терезені жабу
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
    closeBookModal();
  }
});

// Іздеу және сұрыптау оқиғалары
if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    searchQuery = event.target.value;
    updateCatalog();
  });
}

if (sortSelect) {
  sortSelect.addEventListener("change", (event) => {
    sortBy = event.target.value;
    updateCatalog();
  });
}

// Бастапқы іске қосу
renderGenreChips();
updateCatalog();