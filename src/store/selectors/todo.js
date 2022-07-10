
export function selectCompleted(todos) {
  return todos.filter(todo => todo.completed);
}

export function selectNotCompleted(todos) {
  return todos.filter(todo => !todo.completed);
}