import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { Link, useLoaderData } from 'react-router-dom';

import { Psychologist } from './Psychologist';

const Psychologists = () => {
  const clients = useLoaderData() as Psychologist[];

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5">PSYCHOLOGISTS</Typography>
      <List>
        {clients.map((psychologist: Psychologist) => (
          <ListItemButton>
            <Link to={`/psychologists/${psychologist.id}`}>
              <ListItemText primary={psychologist.name} />
            </Link>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Psychologists;
