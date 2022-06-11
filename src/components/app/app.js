import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onLoad } from '../../store/actions/todo';
import { TodoLocal } from '../../services/todo-local';
import { Header } from '../header/header';
import { List } from '../list/list';
import { Footer } from '../footer/footer';
import { CopyRight } from '../copy-right/copy-right';

import { deleteRecord, updateRecords, updateRecord, query } from 'thin-backend';
import { useQuery } from 'thin-backend-react';
export function App() {
  const dispatch = useDispatch();
  // const todos = useSelector(state => state.todos);

  // useEffect(() => {
  //   dispatch(onLoad(TodoLocal.loadTodos()));
  // }, [dispatch]);

  // useEffect(() => {
  //   TodoLocal.storeTodos(todos);
  // }, [todos]);

 
  const modified = query('todos').orderByDesc('createdAt')

  // const todos = useQuery(filter == null? modified: modified.where('complete', search))
   
  const todos = useQuery(modified)
  const show = !!todos && !!todos.length
  console.log(show, todos, 123)
  return (
    <div id="app">
      <section className="todoapp">
        <Header />
        {show && <List />}
        {show && <Footer />}
      </section>
      <CopyRight />
    </div>
  );
}
