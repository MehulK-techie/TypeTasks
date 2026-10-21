import { Task, TaskStatus, addTask, advanceTask, deleteTask, filterByStatus } from "./model.js";

let tasks: Task[] = [];
let currentFilter: "all" | TaskStatus = "all";

// Type-safe DOM element casting
const titleInput = document.getElementById("title") as HTMLInputElement;
const addBtn = document.getElementById("add-btn") as HTMLButtonElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;
const filterChips = document.getElementById("filter-chips") as HTMLDivElement;

function handleAddTask(): void {
  const title = titleInput.value.trim();
  if (!title) return;

  tasks = addTask(tasks, title);
  titleInput.value = "";
  render();
}

addBtn.addEventListener("click", handleAddTask);
titleInput.addEventListener("keypress", (e: KeyboardEvent) => {
  if (e.key === "Enter") handleAddTask();
});

filterChips.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!target.classList.contains("chip")) return;

  const selectedFilter = target.getAttribute("data-filter") as "all" | TaskStatus;
  if (!selectedFilter) return;

  currentFilter = selectedFilter;

  Array.from(filterChips.children).forEach((chip) => chip.classList.remove("active"));
  target.classList.add("active");

  render();
});

function render(): void {
  taskList.innerHTML = "";

  const displayedTasks =
    currentFilter === "all" ? tasks : filterByStatus(tasks, currentFilter);

  displayedTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item";

    const infoDiv = document.createElement("div");
    infoDiv.className = "task-info";

    const badge = document.createElement("span");
    badge.className = `badge ${task.status}`;
    badge.textContent = task.status;

    const titleSpan = document.createElement("span");
    titleSpan.textContent = task.title;

    infoDiv.appendChild(badge);
    infoDiv.appendChild(titleSpan);

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "actions";

    if (task.status !== "done") {
      const advanceBtn = document.createElement("button");
      advanceBtn.className = "btn-action";
      advanceBtn.textContent = "Advance →";
      advanceBtn.onclick = () => {
        tasks = advanceTask(tasks, task.id);
        render();
      };
      actionsDiv.appendChild(advanceBtn);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-action";
    deleteBtn.textContent = "✕";
    deleteBtn.onclick = () => {
      tasks = deleteTask(tasks, task.id);
      render();
    };
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(infoDiv);
    li.appendChild(actionsDiv);
    taskList.appendChild(li);
  });
}

render();