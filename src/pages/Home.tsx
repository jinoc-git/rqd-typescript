import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Todo, addTodo, getTodos } from '../fetch/fetchTodos';
import { AxiosError } from 'axios';
import shortid from 'shortid';

const Home = () => {
  const [title, setTitle] = useState<string>('');
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useQuery(['todos'], getTodos);

  const addMutation = useMutation<
    void,
    AxiosError,
    Todo,
    { prevTodos: Todo[] | undefined }
  >(addTodo, {
    onMutate: async (newTodo: Todo) => {
      await queryClient.cancelQueries(['todos']);
      const prevTodos = queryClient.getQueryData<Todo[]>(['todos']);
      if (prevTodos) {
        queryClient.setQueryData(['todos'], [...prevTodos, newTodo]);
      } else {
        queryClient.setQueryData(['todos'], [newTodo]);
      }
      return { prevTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['todos'], context?.prevTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newTodo = {
      id: shortid.generate(),
      title,
    };
    addMutation.mutate(newTodo);
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러</div>;
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <button>등록</button>
      </form>
      <div>
        {data?.map((todo) => {
          return (
            <div key={todo.id} style={{ border: '1px solid' }}>
              <p>ID: {todo.id}</p>
              <p>TITLE: {todo.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
