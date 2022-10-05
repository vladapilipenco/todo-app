const todoList = [];

const newTodoForm = document.getElementById("newTodoForm");
newTodoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const currentForm = event.target;
  const formData = new FormData(currentForm);

  const todo = formData.get("newTodo").trim();

  if (todo == "") {
    currentForm.classList.add("newTodoFormError");
  } else {
    currentForm.classList.remove("newTodoFormError");
    todoList.push(todo);

    console.log(todoList);

    currentForm.reset();
  }
});
const newTodoInput = document.getElementById("newTodoInput");
newTodoInput.addEventListener("input", function (event) {
  if (newTodoForm.classList.contains("newTodoFormError")) {
    newTodoForm.classList.remove("newTodoFormError");
  }
});
