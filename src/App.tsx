import { MantineProvider } from '@mantine/core';

import { BrowserRouter as Router } from 'react-router-dom';

import { useRoutes } from './routes';

import 'dayjs/locale/ru';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

function App() {
  const routes = useRoutes();

  return (
    <MantineProvider>
      <Router>{routes}</Router>
    </MantineProvider>
  );
}

export default App;
