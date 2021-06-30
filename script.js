'use strict';

let todos = localStorage.getItem('todo-items')
  ? JSON.parse(localStorage.getItem('todo-items'))
  : [];

// let todosData = JSON.parse(localStorage['todo-items']); // BUG
// let todosData = JSON.parse(localStorage.getItem('todo-items')); // BUG

const form = document.querySelector('.todo-form');
const formInput = document.querySelector('.input');
const formValue = document.querySelector('.input').value;
const todosContainer = document.querySelector('.todos-container');
const clearBtn = document.querySelector('.clear-btn');

function resetUI() {
  todosContainer.innerHTML = '';
}

function toggleClearAllBtn() {
  if (todosContainer.children.length > 0) clearBtn.classList.remove('hidden');
  if (todosContainer.children.length === 0) clearBtn.classList.add('hidden');
}

const clearAll = function () {
  resetUI();
  localStorage.clear();
  todos = [];
  toggleClearAllBtn();
};

function renderData() {
  resetUI();
  let todosClone = [...todos];
  let todosReversed = todosClone.reverse();

  // 1. loop and render checked todos
  todosReversed.forEach(todo => {
    if (todo.checked === false) return;
    const checkedMarkup = `<div class="todo-item checked">
        <p>${todo.todoTitle}</p>
        <button class="check-off">✅</button>
        <button class="edit">✍️</button>
        <button class="delete">🚫</button>
       </div>`;
    todosContainer.insertAdjacentHTML('afterbegin', checkedMarkup);
  });

  // 2. loop and render unchecked todos
  todosReversed.forEach(todo => {
    if (todo.checked === true) return;
    const uncheckedMarkup = `<div class="todo-item">
        <p>${todo.todoTitle}</p>
        <button class="check-off">✅</button>
        <button class="edit">✍️</button>
        <button class="delete">🚫</button>
       </div>`;
    todosContainer.insertAdjacentHTML('afterbegin', uncheckedMarkup);
  });
  toggleClearAllBtn();
}

function createNewTodo() {
  const renderNewTodo = function (e) {
    e.preventDefault();

    // guard clause for blank form entry
    if (formValue === '') return;

    // push string & todo status to local todos array
    todos.push({ todoTitle: `${formValue}`, checked: false });

    // store local state (todos array) in local storage
    if (typeof Storage !== 'undefined') {
      localStorage.setItem('todo-items', JSON.stringify(todos));
    } else {
      // Alert to user that storage is not supported
      window.alert('Local storage is not supported in your browser.');
    }

    renderData();
    toggleClearAllBtn();

    // clear form field for next entry
    form.reset();
  };

  form.addEventListener('submit', renderNewTodo);
}

function handleChecks() {
  const checkHandler = function (e) {
    function checkTitle(t) {
      return t.todoTitle === todo.firstElementChild.textContent;
    }
    const todo = e.target.closest('.todo-item');
    const currentTodo = todos.find(checkTitle);
    const i = todos.indexOf(currentTodo);

    if (e.target.classList.contains('check-off')) {
      todo.classList.add('checked');
      // update localStorage
      todos[`${i}`].checked = true; // overwrite
      localStorage['todo-items'] = JSON.stringify(todos); // update
      renderData();
    }
    if (e.target.classList.contains('checked')) {
      todo.classList.remove('checked');
      // update localStorage
      todos[`${i}`].checked = false; // overwrite
      localStorage['todo-items'] = JSON.stringify(todos); // update
      renderData();
    }
  };

  todosContainer.addEventListener('click', checkHandler);
}

function editTodo() {
  const editHandler = function (e) {
    const todo = e.target.closest('.todo-item');
    todo.classList.toggle('todo--active-edit');

    if (todo.classList.contains('todo--active-edit')) {
      formInput.focus();
    }
  };

  todosContainer.addEventListener('click', editHandler);
}

function deleteTodo() {
  const deleteHandler = function (e) {
    function checkTitle(t) {
      return t.todoTitle === todo.firstElementChild.textContent;
    }
    const todo = e.target.closest('.todo-item');
    const currentTodo = todos.find(checkTitle);
    const i = todos.indexOf(currentTodo);

    if (e.target.classList.contains('delete')) {
      todos.splice(`${i}`, 1);
      localStorage['todo-items'] = JSON.stringify(todos);
      renderData();
    }
  };

  todosContainer.addEventListener('click', deleteHandler);
}

function init() {
  renderData();
  createNewTodo();
  editTodo();
  deleteTodo();
  handleChecks();
}

clearBtn.addEventListener('click', clearAll);

init();
