import { useDispatch, useSelector } from 'react-redux';
import { Item } from '../item/item';
import { selectVisible } from '../../store/selectors/todo';
import { onUpdate, onRemove, onCompleteAll } from '../../store/actions/todo';
import { useEffect } from 'react';
import { deleteRecord, updateRecords, updateRecord, query } from 'thin-backend';
import { useQuery } from 'thin-backend-react';
import {useState} from 'react'
export function List() {
  // const dispatch = useDispatch();
  // useEffect(()=>{
  //   var todos = useQuery(query('todos').orderByDesc('createdAt').where('complete', filter));
  // }, [filter])

  // const visibleTodos = useSelector(state => selectVisible(state.todos, state.filter));
  // const areAllCompleted = useSelector(state => state.todos.length && state.todos.every(todo => todo.completed));
  // const completeAll = () => dispatch(onCompleteAll());
  // const update = values => dispatch(onUpdate(values));
  // const remove = id => dispatch(onRemove(id));

//   function addTodo(event) {
//     createRecord('todos', {
//         title: window.prompt('Enter a title:') || '',
//         userId: getCurrentUserId()
//     });
// }

const [setFilter, filter] = useState(null)
const todos = useQuery(query('todos').orderByDesc('createdAt').where('complete', filter));
const visibleTodos = todos
const areAllCompleted = todos.length && todos.every(todo => todo.completed)
const todoIds = [ todos ].map(todo => todo.id)
const completeAll = async ()=>await updateRecords('todos', todoIds, { completed: true })
const update = async todo =>await updateRecord('todos', todo.id, todo)
const remove = async id => await deleteRecord('todos', id)
  return (
    <section className="main">
      <input id="toggle-all" className="toggle-all" type="checkbox" checked={areAllCompleted} readOnly />
      <label htmlFor="toggle-all" onClick={completeAll} />

      <ul className="todo-list">
        {todos.map(todo => (
          <Item key={todo.id} todo={todo} onUpdate={update} onRemove={remove} />
        ))}
      </ul>
    </section>
  );
}