import { Header } from '../header/header';
import { List } from '../list/list';
import { Footer } from '../footer/footer';
import { CopyRight } from '../copy-right/copy-right';

import { query } from 'thin-backend';
import { useQuery } from 'thin-backend-react';
export function App() {
 
  const modified = query('todos').orderByDesc('createdAt')

  const todos = useQuery(modified)
  const show = !!todos && !!todos.length
  
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
