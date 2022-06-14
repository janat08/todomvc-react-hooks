import { createRoot } from 'react-dom/client';
import 'todomvc-app-css/index.css';
import { Provider } from 'react-redux';
import { createStore } from './store';
import { App } from './components/app/app';
import { initThinBackend } from 'thin-backend';
import { ThinBackend } from 'thin-backend-react';

// This needs to be run before any calls to `query`, `createRecord`, etc.
initThinBackend({
  // This url is different for each backend, you can find the backend url in the project documentation
  host: 'https://todos-new.thinbackend.app'
});


const container = document.querySelector('app-root');
const root = createRoot(container);
root.render(
    <ThinBackend>
  <Provider store={createStore()}>
    <App />
  </Provider>
    </ThinBackend>
);
