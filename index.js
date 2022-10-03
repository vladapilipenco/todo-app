const todoList = [];

const newTodoForm = document.getElementById("newTodoForm");
newTodoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const currentForm = event.target;
  const formData = new FormData(currentForm);

  todoList.push(formData.get("newTodo"));
  console.log(todoList);

  currentForm.reset();
});
