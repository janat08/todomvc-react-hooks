import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { FILTERS } from '../../constants/filter';
import { selectCompleted, selectNotCompleted } from '../../store/selectors/todo';
import { onClearCompleted } from '../../store/actions/todo';
import { onFilterSelect } from '../../store/actions/filter';
import { useQuery } from 'thin-backend-react';
import { deleteRecords, deleteRecord, updateRecords, updateRecord, query } from 'thin-backend';

export function Footer() {
  const filterTitles = [
    { key: FILTERS.all, value: 'All' },
    { key: FILTERS.active, value: 'Active' },
    { key: FILTERS.completed, value: 'Completed' }
  ];
  const todos = useQuery(query('todos').orderByDesc('createdAt'))
  const useTodos = fn=> fn(todos)

  const completedCount = useTodos(state => selectCompleted(state.todos).length);
  const itemsLeft = useTodos(state => selectNotCompleted(state.todos).length);
  // const filter = useSelector(state => state.filter);
  const filter = useQuery(query('filters'))
  const clearCompleted = async ()=> await deleteRecords('todos', todos.filter(x=>x.completed).map(x=>x.id));
  // const clearCompleted = () => dispatch(onClearCompleted());
  
  // const filterSelect = selectedFilter => dispatch(onFilterSelect(selectedFilter));
  const filterSelect = async value => await updateRecord('filters',filter[0].id, { value });;
  const itemText = itemsLeft === 1 ? 'item' : 'items';

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft}</strong>
        <span> {itemText} left</span>
      </span>
      <ul className="filters">
        {filterTitles.map(filterTitle => (
          <li key={filterTitle.key}>
            <a
              href="./#"
              className={classNames({ selected: filterTitle.key === filter[0].value })}
              onClick={() => filterSelect(filterTitle.key)}
            >
              {filterTitle.value}
            </a>
          </li>
        ))}
      </ul>
      {!!completedCount && (
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
}
