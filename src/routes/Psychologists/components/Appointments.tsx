import { List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { getClient } from '../../../shared/api';
import { Timeslot } from '../../../shared/types';
import { getTimeslotString } from '../../../shared/utils';
import { Client } from '../../Clients/Client';

const Apointment = ({ startDateTime, endDateTime, clientId }: Timeslot) => {
  const [clientName, setClientName] = useState('');

  useEffect(() => {
    getClient(clientId)
      .then((res: Client) => {
        setClientName(res.name);
      })
      .catch((e) => {
        setClientName('Unknown');
      });
  }, []);

  return (
    <ListItemButton>
      <ListItemText
        primary={`${getTimeslotString(
          startDateTime,
          endDateTime
        )} with client ${clientName}`}
      />
    </ListItemButton>
  );
};

const Appointments = ({ timeslots }: { timeslots: Timeslot[] | undefined }) => {
  const appointmentsList = timeslots?.filter(
    (timeslot) => timeslot.clientId !== ''
  );

  if (!appointmentsList?.length)
    return <Typography>No Appointments</Typography>;

  const Appointments = () =>
    appointmentsList?.map((timeslot: Timeslot, index: number) => (
      <Apointment {...timeslot} key={index} />
    ));

  return <List>{Appointments()}</List>;
};

export default Appointments;
