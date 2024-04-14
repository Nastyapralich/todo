const addBtn = document.querySelector(".addBtn");
const deleteBtn = document.querySelector(".deleteBtn");
const sortBtn = document.querySelector(".sortBtn");
const taskInput = document.getElementsByTagName("input")[0];
const taskQueue = document.querySelector(".taskQueue");

let todos = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

showTask();

function showTask() {
  let todos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

  sortTodos();

  taskQueue.innerHTML = "";

  todos.forEach((el) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("taskQueueItem");

    const taskText = document.createElement("p");
    taskText.textContent = el.text;

    const checkTask = document.createElement("span");
    checkTask.classList.add("checkTask");
    checkTask.addEventListener("click", () => toggleTask(el.id));

    const delTask = document.createElement("button");
    delTask.classList.add("delTask");
    delTask.textContent = "х";
    delTask.addEventListener("click", () => deleteTask(el.id));

    taskItem.appendChild(taskText);
    taskItem.appendChild(checkTask);
    taskItem.appendChild(delTask);

    if (el.checked) {
      taskItem.classList.add("checked");
    }

    taskQueue.appendChild(taskItem);
  });
}

function addTask() {
  const task = taskInput.value;
  let date = new Date();
  let idRandom = date.getMilliseconds();
  let isChecked = false;

  setTaskInLocalStorage(idRandom, task, isChecked);
}

addBtn.addEventListener("click", addTask);

function deleteAllTasks() {
  localStorage.removeItem("todos");
  todos = [];
  showTask();
}

deleteBtn.addEventListener("click", deleteAllTasks);

function setTaskInLocalStorage(id, task, isChecked) {
  const todo = {
    id: id,
    text: task,
    checked: isChecked,
  };

  taskInput.value = "";

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));

  showTask();
}

function toggleTask(id) {
  const taskIndex = todos.findIndex((task) => task.id === id);

  if (taskIndex !== -1) {
    todos[taskIndex].checked = !todos[taskIndex].checked;
    localStorage.setItem("todos", JSON.stringify(todos));
    showTask();
  }
}

function deleteTask(id) {
  const taskIndex = todos.findIndex((task) => task.id === id);

  if (taskIndex !== -1) {
    todos.splice(taskIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    showTask();
  }
}

function sortTodos() {

  todos.sort((a, b) => {
    if (a.checked && !b.checked) {
      return 1;
    } else if (!a.checked && b.checked) {
      return -1;
    } else {
      return 0;
    }
  });
}

sortBtn.addEventListener("click", showTask);