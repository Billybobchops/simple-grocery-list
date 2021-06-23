'use strict';

function changeOpacity() {
  document.querySelectorAll('.todo-item').forEach((todo) => {
    if (todo.classList.contains('checked')) {
      todo.style.opacity = '.3';
    }
  })
}
changeOpacity();

function complete() {
  const markComplete = function (e) {
    console.log(e);
  }
  document.querySelector('.todo-items').addEventListener('click', markComplete);
}
complete();
