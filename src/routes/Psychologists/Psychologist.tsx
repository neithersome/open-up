import { Box, Grid, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

import Panel from '../../shared/components/Panel';
import { Timeslot } from '../../shared/types';
import AddAvailability from './components/AddAvailability';
import Appointments from './components/Appointments';
import AvailableTimeslots from './components/AvailableTimeslots';

export type Psychologist = {
  id: number;
  name: string;
  timeslots?: Timeslot[];
};

const Psychologist = () => {
  const { name, id, timeslots } = useLoaderData() as Psychologist;

  return (
    <Box sx={{ my: 2 }}>
      {name && (
        <Typography variant="h5" sx={{ mb: 1 }}>{`Hi ${name}`}</Typography>
      )}
      <Grid item container spacing={2}>
        <Grid item container sm={6} direction="column" spacing={2}>
          <Grid item>
            <Panel title="Add Availibility">
              <AddAvailability psychologistId={id} />
            </Panel>
          </Grid>
          <Grid item>
            <Panel title="Upcomming Appointments">
              <Appointments timeslots={timeslots} />
            </Panel>
          </Grid>
        </Grid>
        <Grid item sm={6}>
          <Panel title="Available Timeslots" sx={{ maxHeight: '100vh' }}>
            <AvailableTimeslots timeslots={timeslots} />
          </Panel>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Psychologist;
