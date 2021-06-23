'use strict';

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
      //
    }
  };

  document.querySelector('.todo-items').addEventListener('click', handler);
}
todoHandler();

function createTodo() {
  // blah blah
}
