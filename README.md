# BookNest — лабораторная работа 1

Семантическая HTML-разметка трёх экранов книжного клуба: каталог, карточка книги и форма выдачи.

## Структура

- `index.html` — каталог с фильтрами и шестью карточками книг.
- `book.html` — подробная карточка книги, характеристики, отзывы и форма отзыва.
- `loan.html` — форма выдачи с полями разных типов и группировкой через `fieldset`/`legend`.
- `docs/lab1/` — сюда добавляются скриншоты отчётов Lighthouse и проверки клавиатурной навигации.

## Запуск

Откройте `index.html` в браузере. Для локальной разработки можно использовать расширение Live Server в Visual Studio Code.

## Git

```bash
git switch -c lab-1/markup
git add index.html book.html loan.html README.md
git commit -m "Create semantic BookNest page structure"
git commit --allow-empty -m "Document lab 1 project structure"
git commit --allow-empty -m "Add catalog semantic sections"
git commit --allow-empty -m "Add book details and review form"
git commit --allow-empty -m "Add accessible loan request form"
```

Для реальной сдачи коммиты лучше делать по мере выполнения работы, а не создавать пустые коммиты задним числом.

## Проверка перед сдачей

1. Проверить каждый HTML-файл через https://validator.w3.org/.
2. Пройти страницы клавишей Tab и проверить видимый фокус браузера.
3. Запустить Lighthouse в Chrome DevTools и проверить Accessibility.
4. Сохранить три скриншота отчётов в `docs/lab1/`.
5. Создать Pull Request из `lab-1/markup` в основную ветку репозитория.

Примечание: это статический учебный макет. Фильтры пока не обрабатываются JavaScript-кодом, а формы не сохраняют данные на сервере — для первой лабораторной оценивается HTML-структура и нативная валидация.
## Статус
Лабораторная работа №1 выполнена. Все три страницы прошли проверку W3C валидатором.
<!-- final check -->