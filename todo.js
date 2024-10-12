function displayTodo() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  let list = "";

  if (todos.length > 0) {
    for (let i = 0; i < todos.length; i++) {
      list += `
          <ul class="list-group list-group-horizontal rounded-0 bg-transparent m-2">
              <li class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                  <div class="form-check">
                      <input class="form-check-input me-1" type="checkbox" id="${
                        todos[i].id
                      }"
                          ${todos[i].checked ? "checked" : ""} aria-label="...">
                  </div>
              </li>
              <li class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                  <p class="lead fw-normal mb-0">${todos[i].name}</p>
              </li>
              <li class="list-group-item px-3 py-1 d-flex align-items-center border-0 bg-transparent">
                  <button type="button" class="btn btn-danger" id="${
                    todos[i].id
                  }" onclick="deleteTodo(${todos[i].id})">Delete</button>
              </li>
          </ul>
          `;
    }
  } else {
    // Optional: Display a message if no todos exist
    list = `<p class="text-muted">No todos available.</p>`;
  }

  document.getElementById("list-todo").innerHTML = list;
}

function submitTodo() {
  const todo = document.getElementById("add-todo").value.trim(); // Trim to remove leading/trailing spaces

  // Check if input is empty
  if (todo === "") {
    alert("Please enter a todo before adding."); // Show warning message
    return; // Stop process if input is empty
  }

  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  // Set the new todo ID
  const newTodoId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 0;

  // Add the new todo to the list
  todos.push({
    id: newTodoId,
    name: todo,
    checked: false,
  });

  // Save todos to localStorage
  localStorage.setItem("todos", JSON.stringify(todos));

  // Clear input after successful addition
  document.getElementById("add-todo").value = "";

  // Display the updated todo list
  displayTodo();
}

function deleteTodo(id) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  // Filter out the todo with the given ID
  todos = todos.filter((todo) => todo.id !== id);

  // Save the updated todo list
  localStorage.setItem("todos", JSON.stringify(todos));

  // Update the displayed list
  displayTodo();
}

// Load the todo list when the page loads
window.onload = displayTodo;
