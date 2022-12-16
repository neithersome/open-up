import { Box, Button, Typography } from '@mui/material';
import { Link, useNavigate, useRouteError } from 'react-router-dom';

const Error = ({ message }: { message?: string }) => {
  const error: any = useRouteError();
  const navigate = useNavigate();

  const ErrorMessage = () => (
    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
      <Typography variant="h2">{error?.status}</Typography>
      <Typography variant="h4">{message || error?.statusText}</Typography>
    </Box>
  );

  const Navigation = () => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <Button variant="outlined">
          <Link to="/">Home</Link>
        </Button>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <ErrorMessage />
        <Navigation />
      </Box>
    </Box>
  );
};

export default Error;
