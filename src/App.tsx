import { ThemeProvider } from '@emotion/react';
import { Container } from '@mui/system';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routes } from './routes';
import theme from './shared/theme';

const router = createBrowserRouter(routes);

function App() {
  return (
    <Container
      className="App"
      sx={{ minHeight: '100vh', bgcolor: '#f2f2f2' }}
      maxWidth="xl"
    >
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Container>
  );
}

export default App;
