import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { Link, useLoaderData } from 'react-router-dom';

import { Client } from './Client';

const Clients = () => {
  const clients = useLoaderData() as Client[];

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
      <Typography variant="h5">CLIENTS</Typography>
      <List>
        {clients.map((client: Client) => (
          <ListItemButton>
            <Link to={`/clients/${client.id}`}>
              <ListItemText primary={client.name} />
            </Link>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Clients;
