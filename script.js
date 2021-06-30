'use strict';

let todos = localStorage.getItem('todo-items')
  ? JSON.parse(localStorage.getItem('todo-items'))
  : [];
const todosContainer = document.querySelector('.todos-container');
const clearBtn = document.querySelector('.clear-btn');

// localStorage.setItem('todo-items', JSON.stringify(todos));

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
  // reverse the todos
  const todosClone = [...todos];
  const todosReversed = todosClone.reverse();

  // 1. loop and render checked todos
  todosReversed.forEach(todo => {
    if (todo.checked === false) return;
    const checkedMarkup = `<div class="todo-item checked">
        <p>${todo.todoTitle}</p>
        <button class="check-off">✅</button>
        <div class="delete">🚫</div>
       </div>`;
    todosContainer.insertAdjacentHTML('afterbegin', checkedMarkup);
  });

  // 2. loop and render unchecked todos
  todosReversed.forEach(todo => {
    if (todo.checked === true) return;
    const uncheckedMarkup = `<div class="todo-item">
        <p>${todo.todoTitle}</p>
        <button class="check-off">✅</button>
        <div class="delete">🚫</div>
       </div>`;
    todosContainer.insertAdjacentHTML('afterbegin', uncheckedMarkup);
  });
  toggleClearAllBtn();
}

function createNewTodo() {
  const form = document.querySelector('.todo-form');
  const renderNewTodo = function (e) {
    e.preventDefault();
    const formValue = document.querySelector('.input').value;

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

    resetUI();
    renderData();
    toggleClearAllBtn();

    // clear form field for next entry
    document.querySelector('.todo-form').reset();
  };

  form.addEventListener('submit', renderNewTodo);
}

function handleChecks() {
  const handler = function (e) {
    const todo = e.target.closest('.todo-item');
    const currentTodo = todos.find(checkTitle);
    const i = todos.indexOf(currentTodo);
    const todosData = JSON.parse(localStorage['todo-items']); // read

    function checkTitle(t) {
      return t.todoTitle === todo.firstElementChild.textContent;
    }

    // 1. check and 2. uncheck items
    if (e.target.classList.contains('check-off')) {
      todo.classList.add('checked');

      // update localStorage
      todosData[`${i}`].checked = true; // overwrite
      localStorage['todo-items'] = JSON.stringify(todosData); // update
      console.log(`about to render`);
    }
    if (e.target.classList.contains('checked')) {
      todo.classList.remove('checked');

      // update localStorage
      todosData[`${i}`].checked = false; // overwrite
      localStorage['todo-items'] = JSON.stringify(todosData); // update
    }
  };

  todosContainer.addEventListener('click', handler);
}

function deleteTodo() {
  const deleteHandler = function (e) {
    const todosData = JSON.parse(localStorage['todo-items']);

    if (e.target.classList.contains('delete')) {
      console.log(`Delete Btn clicked.`);
      console.log(todosData);

      localStorage.removeItem(todosData[`${i}`]);
      localStorage['todo-items'] = JSON.stringify(todosData); // not working

      // re-render?
      // renderData();
    }
  };

  todosContainer.addEventListener('click', deleteHandler);
}

clearBtn.addEventListener('click', clearAll);

renderData();
createNewTodo();
deleteTodo();
handleChecks();
