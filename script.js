'use strict';

const todosContainer = document.querySelector('.todos-container');
let todos = localStorage.getItem('todo-items')
  ? JSON.parse(localStorage.getItem('todo-items'))
  : [];

localStorage.setItem('todo-items', JSON.stringify(todos));
const data = JSON.parse(localStorage.getItem('todo-items'));

function renderData() {
  // loop twice to sort checked todos to the end: (what about array.sort()?)

  // 1. loop and render unchecked todos
  data.forEach(todo => {
    if (todo.checked === true) return;
    const uncheckedMarkup = `<div class="todo-item">
        <p>${todo.todoTitle}</p>
        <button class="check-off">✅</button>
        <div class="delete">🚫</div>
       </div>`;
    todosContainer.insertAdjacentHTML('afterbegin', uncheckedMarkup);
  });

  // 2. loop and render checked todos
  data.forEach(todo => {
    if (todo.checked === false) return;
    const checkedMarkup = `<div class="todo-item checked">
        <p>${todo.todoTitle}</p>
        <button class="check-off">✅</button>
        <div class="delete">🚫</div>
       </div>`;
    todosContainer.insertAdjacentHTML('afterbegin', checkedMarkup);
  });
}
renderData();

function createNewTodo() {
  const form = document.querySelector('.todo-form');
  const renderNewTodo = function (e) {
    e.preventDefault();
    const formValue = document.querySelector('.input').value;

    // guard clause for blank form entry
    if (formValue === '') return;

    // push string & todo status to local todos array of objects
    todos.push({ todoTitle: `${formValue}`, checked: false });

    // store state (todos array) in local storage
    if (typeof Storage !== 'undefined') {
      localStorage.setItem('todo-items', JSON.stringify(todos));
    } else {
      // Alert to user that storage is not supported
      window.alert('Local storage is not supported in your browser.');
    }

    // clear / reset the page (prevents rendering duplicates)
    document.querySelector('.todos-container').innerHTML = '';

    // render new todo
    renderData();

    // clear form field for next entry
    document.querySelector('.todo-form').reset();
  };

  form.addEventListener('submit', renderNewTodo);
}
createNewTodo();

function handleTodo() {
  const handler = function (e) {
    const todo = e.target.closest('.todo-item');

    // 1. check and 2. uncheck items
    if (e.target.classList.contains('check-off')) {
      todo.classList.add('checked');
      todo.style.opacity = '.25';
    }
    if (e.target.classList.contains('checked')) {
      todo.classList.remove('checked');
      todo.style.opacity = '1';
    }

    // delete items
    if (e.target.classList.contains('delete')) {
      localStorage.removeItem(`${todo}`);
    }
  };

  todosContainer.addEventListener('click', handler);
}
handleTodo();

function clearAll() {
  // only show clear btn when there are todo items
  if (todosContainer.children.length > 1)
    document.querySelector('.clear-btn').classList.remove('hidden');
  // hide clear btn when there are no todo items
  if (todosContainer.children.length === 0)
    document.querySelector('.clear-btn').classList.add('hidden');

  // localStorage.clear();
}
clearAll();
