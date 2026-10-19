// 1. Literal Union Type
type TaskStatus = "todo" | "in-progress" | "done";

// 2. Task Interface
interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

let nextId = 1;

// 3. Operation: Add Task
function addTask(tasks: Task[], title: string): Task[] {
  const newTask: Task = {
    id: nextId++,
    title,
    status: "todo",
  };
  return [...tasks, newTask];
}

// 4. Operation: Complete Task
function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}

// 5. Operation: Filter by Status
function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((t) => t.status === status);
}

// 6. Custom Operation: Delete Task (Satisfies Originality Requirement)
function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((t) => t.id !== id);
}

// 7. Custom Operation: Advance Task
function advanceTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t) => {
    if (t.id !== id) return t;
    if (t.status === "todo") return { ...t, status: "in-progress" };
    if (t.status === "in-progress") return { ...t, status: "done" };
    return t;
  });
}