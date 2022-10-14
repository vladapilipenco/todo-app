const todoList = [];
displayTodoList();

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

    displayTodoList();

    currentForm.reset();
  }
});
const newTodoInput = document.getElementById("newTodoInput");
newTodoInput.addEventListener("input", function (event) {
  if (newTodoForm.classList.contains("newTodoFormError")) {
    newTodoForm.classList.remove("newTodoFormError");
  }
});

function displayTodoList() {
  const listElement = document.querySelector("ul");
  while (listElement.firstChild) {
    listElement.removeChild(listElement.firstChild);
  }

  todoList.forEach(function (todo, index) {
    const li = document.createElement("li");
    li.classList.add("todoItem");

    const id = "todo" + index + 1;

    li.innerHTML = `
        <label for="${id}" class="checkboxContainer">
            <input type="checkbox" id="${id}" name="${id}" value="" />
            <span class="checkmark"></span>
            <span class="title">${todo}</span>
          </label>
          <div class="buttonsContainer">
            <button type="button" class="actionButton">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  class="svgIcon"
                  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                />
              </svg>
            </button>
            <button type="button" class="actionButton">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  class="svgIcon"
                  d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"
                />
              </svg>
            </button>
          </div>
    `;
    listElement.appendChild(li);
  });
}
