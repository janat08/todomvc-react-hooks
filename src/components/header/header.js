import { useState } from 'react';
import { createRecord, deleteRecord, updateRecords, updateRecord } from 'thin-backend';

const ENTER_KEY = 'Enter';

export function Header() {
  const [name, setName] = useState('');
  
  const handleChange = event => setName(event.target.value);

  const handleSubmit = async event => {
    if (event.key !== ENTER_KEY) {
      return;
    }
    await createRecord('todos', {name});
    setName('');
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={name}
        onInput={handleChange}
        onKeyUp={handleSubmit}
        onChange={() => {}}
        data-testid="todo-create"
      />
    </header>
  );
}
