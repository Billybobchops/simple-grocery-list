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

  // clear form field for next entry
  createForm.reset();
};

const handleChecks = function (e) {
  // if the event target doesn't happen on the todos container or its children, return
  // console.log(e.target.closest('todos-container')); // null

  // if (!e.target.classList.contains('check-off')) return; // can't uncheck items now
  // if (e.target !== e.target.closest('todos-container')) return; // works but cant check/uncheck etc
  // if (!e.target.classList.contains('.todo-item')) return; // doesn't work either...
  // if (!e.target.closest('todos-container')) return;
  // if (e.target !== todosContainer) return;

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

  // Need guard clause here
  if (!e.target.classList.contains('edit')) return;

  // is there a better way to do this than to nest if statements...?!
  if (e.target.classList.contains('edit')) {
    if (!todo.classList.contains('todo--active-edit')) {
      todo.classList.add('todo--active-edit');
      createForm.classList.add('hidden');
      updateForm.classList.remove('hidden');
      // need to loop over todos and remove active edit
      // so that no more than one can be active at a time
      updateFormInput.placeholder = `${todo.firstElementChild.textContent}`;
      todo.style.backgroundColor = '#bbcbf7';
      updateFormInput.focus();
    } else {
      todo.classList.remove('todo--active-edit');
    }
  }
};

const renderUpdate = function (e) {
  e.preventDefault();
  const activeEdit = document.querySelector('.todo--active-edit');
  function checkTitle(t) {
    return t.todoTitle === activeEdit.firstElementChild.textContent;
  }
  const currentTodo = todos.find(checkTitle);
  const i = todos.indexOf(currentTodo);

  let formValue = document.querySelector('.update-input').value;

  // copy and edit the local storage code from handleChecks() function here

  // re-render newly update list to the UI
  // renderUI();
};

const deleteTodo = function (e) {
  // if (e.target !== e.target.classList.contains('delete')) return; // prevents delete from happening at all...

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
