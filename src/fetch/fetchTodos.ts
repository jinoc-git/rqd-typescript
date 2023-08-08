import axios from 'axios';

export type Todo = {
  id: string;
  title: string;
};

export const getTodos = async (): Promise<Todo[]> => {
  const { data } = await axios.get<Todo[]>('http://localhost:3001/todos');
  return data;
};

export const addTodo = async (newTodo: Todo) => {
  await axios.post('http://localhost:3002/todos', newTodo);
};
