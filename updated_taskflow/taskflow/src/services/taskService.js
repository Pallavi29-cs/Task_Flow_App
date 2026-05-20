/* services/taskService.js
   Handles all API calls — keeps fetch logic outside components */

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

/**
 * Transform raw API response into our app's task structure.
 * Only take first 20 items to keep the list manageable.
 *
 * API shape:  { userId, id, title, completed }
 * App shape:  { id, task, status, assignedTo }
 */
const transformTask = (apiTask) => ({
  id: apiTask.id,
  task: apiTask.title,
  status: apiTask.completed ? 'Completed' : 'In Progress',
  assignedTo: '',
});

/**
 * Fetch tasks from the API with an artificial 0.5s delay
 * so the loading spinner is visible.
 * @returns {Promise<Array>} transformed tasks
 */
export async function fetchTasks() {
  // Artificial delay to show loader (as required)
  await new Promise((resolve) => setTimeout(resolve, 500));

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Limit to first 20 tasks
  return data.slice(0, 20).map(transformTask);
}
