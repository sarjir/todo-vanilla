const todos = 'my-todos';
const myElement = document.getElementById(todos);

const handleOnSubmit = (e) => {
  e.preventDefault();
  const input = document.getElementById('new-todo');

  addNewTodo(input);
}

function addNewTodo(input) {
  addTodoToList(input.value);
  resetInput(input);
};

function addTodoToList(value) {
  const newTodo = createTodo(value);

  myElement.appendChild(newTodo);
}

function createTodo(newTodo) {
  const listElement = document.createElement("LI");
  listElement.setAttribute("data-state", "active")

  const id = createId(newTodo);
  const textNode = document.createTextNode(newTodo);
  const label = createLabel(id);
  const checkMarkElement = createCheckmark(id);
  const removeButton = createRemoveButton();

  label.appendChild(textNode)
  listElement.appendChild(checkMarkElement);
  listElement.appendChild(label);
  listElement.appendChild(removeButton);

  return listElement;
}

function createId(name) {
  return `${name}-${Math.random()}`;
}

function createLabel(name) {
  const label = document.createElement("LABEL");
  label.setAttribute('for', name);

  return label;
}

function createCheckmark(name) {
  const checkMarkElement = document.createElement("INPUT");
  checkMarkElement.setAttribute("type", "checkbox");
  checkMarkElement.setAttribute("id", name);
  checkMarkElement.onclick = handleTodoClick;

  return checkMarkElement;
}

function resetInput(input) {
  return input.value = '';
}

function createRemoveButton() {
  const button = document.createElement("INPUT");
  button.setAttribute("type", "button");
  button.setAttribute("class", "removeButton");
  button.onclick = handleRemove;
  button.value = 'X'

  return button;
}

const handleRemove = (event) => {
  event.target.parentNode.remove();
}

const handleState = (state) => {
  const myTodos = document.getElementById(todos);
  const allTodos = myTodos.children;
  const allActiveTodos = myTodos.querySelectorAll('[data-state="active"]');
  const allCompletedTodos = myTodos.querySelectorAll('[data-state="completed"]');

  switch (state) {
    case 'all': {
      loopTodos(allTodos, 'visible');

      break;
    }
    case 'active': {
      loopTodos(allActiveTodos, 'visible');
      loopTodos(allCompletedTodos, 'not-visible')

      break;
    }
    case 'completed': {
      loopTodos(allActiveTodos, 'not-visible');
      loopTodos(allCompletedTodos, 'visible')

      break;
    }
  }
}

function loopTodos(todos, className) {
  for (const todo in todos) {
    if (todo === 'length') break;
    setClassOfTodo(todos[todo], className);
  }
}

function setClassOfTodo(todo, className) {
  return todo.setAttribute("class", className);
}

const handleTodoClick = (test) => {
  test.target.checked ? test.target.parentNode.setAttribute("data-state", "completed") : test.target.parentNode.setAttribute("data-state", "active");
}
