const todos = [];
//todos.push("Buy milk", "Clean the carpet");
todos.push({ title: "Buy milk" }, { title: "Clean the carpet" });

//Display
todos.forEach(function (todo) {
  console.log(todo.title);
});

//Modify
for (let i = 0; i < todos.length; i++) {
  todos[i].title = `${i + 1}. ${todos[i].title}`;
  console.log(todos[i].title);
}

let newTodos = todos.map(function (todo, index) {
  if (index == todos.length - 1) {
    return { title: `${todo.title}!` };
  } else {
    return todo;
  }
});

for (let todo of newTodos) {
  console.log(todo.title);
}

newTodos = newTodos.filter(function (todo) {
  return !todo.title.includes("1");
});

//Display with while
let i = 0;
while (i < newTodos.length) {
  console.log(newTodos[i].title);
  i++;
}
