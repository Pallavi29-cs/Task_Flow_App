import { API_URL, API_FETCH_LIMIT, LOADER_DELAY_MS, STATUS } from '../utils/constants';


function transformTodo(todo) {
  return {
    id:         todo.id,
    task:       todo.title,
    status:     todo.completed ? STATUS.COMPLETED : STATUS.IN_PROGRESS,
    assignedTo: '',
  };
}


export async function fetchTasks() {
  
  await new Promise((resolve) => setTimeout(resolve, LOADER_DELAY_MS));

  const response = await fetch(`${API_URL}?_limit=${API_FETCH_LIMIT}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch tasks. Status: ${response.status}`);
  }

  const todos = await response.json();
  return todos.map(transformTodo);
}