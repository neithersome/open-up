import { Box, Grid, Typography } from '@mui/material';
import { CalendarPicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { Moment } from 'moment';
import { useState } from 'react';

import { useLoaderData } from 'react-router-dom';
import Panel from '../../shared/components/Panel';
import { Timeslot } from '../../shared/types';
import Appointments from './components/Apointments';
import AvailableTimeslots from './components/AvailableTimeslots';

export type Client = {
  id: number;
  name: string;
  timeslots: Timeslot[];
};

const Client = () => {
  const { name, id, timeslots } = useLoaderData() as Client;
  const [date, setDate] = useState<Moment | null>(moment());

  return (
    <Box sx={{ my: 2 }}>
      {name && (
        <Typography variant="h5" sx={{ mb: 1 }}>{`Hi ${name}`}</Typography>
      )}
      <Grid item container spacing={2}>
        <Grid item container spacing={2}>
          <Grid item xs={4}>
            <Panel>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <CalendarPicker
                  date={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  disablePast
                />
              </LocalizationProvider>
            </Panel>
          </Grid>
          <Grid item xs={8}>
            <Panel title="Available Times">
              <AvailableTimeslots date={date} clientId={id} />
            </Panel>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Panel title="Upcoming Appointments">
            <Appointments timeslots={timeslots} />
          </Panel>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Client;
