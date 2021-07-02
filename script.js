'use strict';

let todos = localStorage.getItem('todo-items')
  ? JSON.parse(localStorage.getItem('todo-items'))
  : [];

const createForm = document.querySelector('.create-form');
const createFormInput = document.querySelector('.create-input');
const updateForm = document.querySelector('.update-form');
const updateFormInput = document.querySelector('.update-input');
const todosContainer = document.querySelector('.todos-container');
const clearBtn = document.querySelector('.clear-btn');

function switchForms() {
  createForm.classList.toggle('hidden');
  updateForm.classList.toggle('hidden');
}

function showUpdateForm() {
  createForm.classList.add('hidden');
  updateForm.classList.remove('hidden');
}

function showCreateForm() {
  createForm.classList.remove('hidden');
  updateForm.classList.add('hidden');
}

function resetUI() {
  todosContainer.innerHTML = '';
}

function renderUI() {
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

function toggleClearAllBtn() {
  if (todosContainer.children.length > 0) clearBtn.classList.remove('hidden');
  if (todosContainer.children.length === 0) clearBtn.classList.add('hidden');
}

const createNewTodo = function (e) {
  e.preventDefault();
  let formValue = document.querySelector('.create-input').value;

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

  renderUI();
  toggleClearAllBtn();
  createForm.reset();
};

const handleChecks = function (e) {
  if (e.target === todosContainer) return;

  const todo = e.target.closest('.todo-item');
  function checkTitle(t) {
    return t.todoTitle === todo.firstElementChild.textContent;
  }
  const currentTodo = todos.find(checkTitle);
  const i = todos.indexOf(currentTodo);

  if (e.target.classList.contains('check-off')) {
    todo.classList.add('checked');
    // update localStorage
    todos[`${i}`].checked = true; // overwrite
    localStorage['todo-items'] = JSON.stringify(todos); // update
    renderUI();
  }
  if (e.target.classList.contains('checked')) {
    todo.classList.remove('checked');
    // update localStorage
    todos[`${i}`].checked = false; // overwrite
    localStorage['todo-items'] = JSON.stringify(todos); // update
    renderUI();
  }
};

const updateTodo = function (e) {
  const todo = e.target.closest('.todo-item');

  if (!e.target.classList.contains('edit')) return;

  if (todo.classList.contains('todo--active-edit')) {
    todo.classList.remove('todo--active-edit');
    showCreateForm();
    updateFormInput.placeholder = `e.g. eggs`;
    return;
  }

  document
    .querySelectorAll('.todo-item')
    .forEach(td => td.classList.remove('todo--active-edit'));
  todo.classList.add('todo--active-edit');
  showUpdateForm();
  updateFormInput.placeholder = `${todo.firstElementChild.textContent}`;
  updateFormInput.focus();
};

const renderUpdate = function (e) {
  e.preventDefault();
  const activeEdit = document.querySelector('.todo--active-edit');
  let formValue = document.querySelector('.update-input').value;
  function checkTitle(t) {
    return t.todoTitle === activeEdit.firstElementChild.textContent;
  }
  const currentTodo = todos.find(checkTitle);
  const i = todos.indexOf(currentTodo);

  todos[`${i}`].todoTitle = formValue; // overwrite
  localStorage['todo-items'] = JSON.stringify(todos); // update

  renderUI();
  updateFormInput.placeholder = `e.g. eggs`;
  updateForm.reset();
  showCreateForm();
};

const deleteTodo = function (e) {
  if (!e.target.classList.contains('delete')) return;

  const todo = e.target.closest('.todo-item');
  function checkTitle(t) {
    return t.todoTitle === todo.firstElementChild.textContent;
  }
  const currentTodo = todos.find(checkTitle);
  const i = todos.indexOf(currentTodo);

  if (e.target.classList.contains('delete')) {
    todos.splice(`${i}`, 1);
    localStorage['todo-items'] = JSON.stringify(todos);
    renderUI();
  }
};

const clearAll = function () {
  resetUI();
  localStorage.clear();
  todos = [];
  toggleClearAllBtn();
};

renderUI();

createForm.addEventListener('submit', createNewTodo);
updateForm.addEventListener('submit', renderUpdate);
todosContainer.addEventListener('click', handleChecks);
todosContainer.addEventListener('click', updateTodo);
todosContainer.addEventListener('click', deleteTodo);
clearBtn.addEventListener('click', clearAll);
