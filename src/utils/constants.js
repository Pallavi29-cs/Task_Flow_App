export const API_URL = 'https://jsonplaceholder.typicode.com/todos';


export const API_FETCH_LIMIT = 20;


export const LOADER_DELAY_MS = 500;


export const STATUS = {
  IN_PROGRESS: 'In Progress',
  COMPLETED:   'Completed',
  HOLD:        'Hold',
};


export const STATUS_OPTIONS = [
  STATUS.IN_PROGRESS,
  STATUS.COMPLETED,
  STATUS.HOLD,
];


export const STORAGE_KEYS = {
  AUTH_USER: 'taskflow_user',
  TASKS:     'taskflow_tasks',
};