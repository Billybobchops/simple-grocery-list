'use strict';

const todoItems = document.querySelector('.todo-items');

function createTodo() {
  const unchecked = [];
  const checked = [];

  const renderItems = function (e) {
    e.preventDefault();
    const formValue = document.querySelector('.input').value;

    // clear / reset (very important)
    document.querySelector('.todo-items').innerHTML = '';

    // Push new item to unchecked array
    unchecked.push(formValue);

    // Spread unchecked array with checked array
    const completeList = [...unchecked, ...checked];

    // loop over completeList array to create markup
    completeList.forEach(todo => {
      const markup = ` <div class="todo-item">
          <p>${todo}</p>
          <button class="check-off">✅</button>
          <div class="delete">🚫</div>
        </div>`;
      todoItems.insertAdjacentHTML('afterbegin', markup);
    });

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

  todoItems.addEventListener('click', handler);
}
todoHandler();
