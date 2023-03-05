const form = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

let todos = [];

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const todoText = todoInput.value.trim();
  if (todoText === '') return;

  const todo = {
    id: Date.now(),
    text: todoText,
    done: false,
  };

  todos.push(todo);
  renderTodos();
  todoInput.value = '';
});

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const checkBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    const inputEdit = document.createElement('input');

    li.dataset.id = todo.id;
    span.textContent = todo.text;
    checkBtn.textContent = 'Done';
    deleteBtn.textContent = 'Delete';
    editBtn.textContent = 'Edit';
    inputEdit.type = 'text';
    inputEdit.value = todo.text;

    checkBtn.addEventListener('click', function() {
      const id = todo.id;
      const index = todos.findIndex(todo => todo.id === id);
      todos[index].done = !todos[index].done;
      renderTodos();
    });

    deleteBtn.addEventListener('click', function() {
      const id = todo.id;
      todos = todos.filter(todo => todo.id !== id);
      renderTodos();
    });

    editBtn.addEventListener('click', function() {
      const id = todo.id;
      const li = document.querySelector(`li[data-id='${id}']`);
      li.classList.add('editing');
      const input = li.querySelector('input[type="text"]');
      input.focus();
      input.setSelectionRange(0, input.value.length);
    });

    inputEdit.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        const id = todo.id;
        const index = todos.findIndex(todo => todo.id === id);
        todos[index].text = e.target.value.trim();
        renderTodos();
      } else if (e.key === 'Escape') {
        renderTodos();
      }
    });

    inputEdit.addEventListener('blur', function() {
      renderTodos();
    });

    li.appendChild(span);
    li.appendChild(inputEdit);
    li.appendChild(checkBtn);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    if (todo.done) li.classList.add('done');
    todoList.appendChild(li);
  });
}
