'use strict';

const todosContainer = document.querySelector('.todos-container');
const todos = [];

function createTodo() {
  const renderItems = function (e) {
    e.preventDefault();
    const formValue = document.querySelector('.input').value;

    // guard clause for blank form entry
    if (formValue === '') return;

    // store state in local storage: ???

    // push string AND todo status to todos array(object?)
    todos.push(formValue);

    // clear / reset (prevents rendering duplicates)
    document.querySelector('.todos-container').innerHTML = '';

    // loop over todos
    todos.forEach(todo => {
      // check todo status: (checked vs unchecked)

      const uncheckedMarkup = `<div class="todo-item ${status}">
          <p>${todo}</p>
          <button class="check-off">✅</button>
          <div class="delete">🚫</div>
        </div>`;
      todosContainer.insertAdjacentHTML('afterbegin', uncheckedMarkup);
    });

    // loop over completeList array to create markup
    // unchecked.forEach(todo => {
    //   const uncheckedMarkup = ` <div class="todo-item">
    //       <p>${todo}</p>
    //       <button class="check-off">✅</button>
    //       <div class="delete">🚫</div>
    //     </div>`;
    //   todosContainer.insertAdjacentHTML('afterbegin', uncheckedMarkup);
    // });

    // checked.forEach(todo => {
    //   const checkedMarkup = ` <div class="todo-item checked">
    //       <p>${todo}</p>
    //       <button class="check-off">✅</button>
    //       <div class="delete">🚫</div>
    //     </div>`;
    //   todosContainer.insertAdjacentHTML('afterbegin', checkedMarkup);
    // });

    // clear form field
    document.querySelector('.todo-form').reset();
  };

  document.querySelector('.todo-form').addEventListener('submit', renderItems);
}
createTodo();

function todoHandler() {
  const handler = function (e) {
    const todo = e.target.closest('.todo-item');

    // check and uncheck items
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
      // build out functionality after createTodo function
    }
  };

  todosContainer.addEventListener('click', handler);
}
todoHandler();
