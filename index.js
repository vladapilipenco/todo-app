const TODO_STORAGE_KEY = "todos";

let todoList = JSON.parse(localStorage.getItem(TODO_STORAGE_KEY) || "[]");

const newTodoForm = document.getElementById("newTodoForm");
const newTodoInput = document.getElementById("newTodoInput");
const listElement = document.querySelector("ul");

function displayTodoList() {
  todoList.forEach(function (todo) {
    createTodoItem(todo);
  });
}

newTodoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const currentForm = event.target;
  const formData = new FormData(currentForm);

  const todo = formData.get("newTodo").trim();

  if (todo == "") {
    currentForm.classList.add("newTodoFormError");
  } else {
    currentForm.classList.remove("newTodoFormError");
    if (
      todoList.find(function (currentTodo) {
        return currentTodo.title == todo;
      })
    ) {
      alert("This todo already exists");
    } else {
      const newTodoItem = { id: Date.now(), title: todo, status: "new" };

      todoList.push(newTodoItem);

      localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todoList));

      createTodoItem(newTodoItem);

      currentForm.reset();
    }
  }
});

newTodoInput.addEventListener("input", function (event) {
  if (newTodoForm.classList.contains("newTodoFormError")) {
    newTodoForm.classList.remove("newTodoFormError");
  }
});

function createTodoItem(todo) {
  const li = document.createElement("li");
  li.classList.add("todoItem");

  const id = "todo" + todo.id;

  li.innerHTML = `
        <label for="${id}" class="checkboxContainer">
            <input type="checkbox" id="${id}" name="${id}" ${
    todo.status == "new" ? "" : "checked"
  } />
            <span class="checkmark"></span>
            <span class="title">${todo.title}</span>
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
        <form action="" id="editTodoForm">
            <label for="editTodoInput">Edit:</label>
            <input type="text" id="editTodoInput" name="editTodo" value="${
              todo.title
            }" />
            <button class="saveButton">Save</button>
        </form>
    `;

  listElement.appendChild(li);

  const checkboxStatus = li.querySelector("#" + id);
  checkboxStatus.addEventListener("change", function (event) {
    const status = event.target.checked ? "done" : "new";
    todoList = todoList.map(function (currentTodo) {
      if (todo.id == currentTodo.id) {
        return { ...currentTodo, status: status };
      } else {
        return currentTodo;
      }
    });
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todoList));
  });

  const actionButtons = li.querySelectorAll(".actionButton");

  const editTodoItemButton = actionButtons[0];
  editTodoItemButton.addEventListener("click", function (event) {
    li.classList.remove("todoItem");
    li.classList.add("editTodoItem");
  });

  const deleteTodoItemButton = actionButtons[1];
  deleteTodoItemButton.addEventListener("click", function (event) {
    todoList = todoList.filter(function (currentTodo) {
      return currentTodo.id != todo.id;
    });
    listElement.removeChild(li);
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todoList));
  });

  const editTodoForm = li.querySelector("#editTodoForm");
  editTodoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const currentForm = event.target;
    const formData = new FormData(currentForm);

    const newTodo = formData.get("editTodo").trim();
    if (newTodo == "") {
      alert("This field should not be empty");
    } else {
      todoList = todoList.map(function (currentTodo) {
        if (currentTodo.id == todo.id) {
          return { ...currentTodo, title: newTodo };
        } else {
          return currentTodo;
        }
      });

      li.querySelector(".title").innerText = newTodo;
      li.classList.add("todoItem");
      li.classList.remove("editTodoItem");
      localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todoList));
    }
  });
}

displayTodoList();
