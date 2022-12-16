import { Box } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Link to="/">Home</Link>
        <Link to="/psychologists">Psychologists</Link>
        <Link to="/clients">Clients</Link>
      </Box>
      <Outlet />
    </Box>
  );
};

export default Root;
