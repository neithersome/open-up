import { List, ListItemButton, ListItemText, Typography } from '@mui/material';

import { Timeslot } from '../../../shared/types';
import useFetchPerson from '../../../shared/useFetchPerson';
import { getTimeslotString } from '../../../shared/utils';

const Apointment = ({ startDateTime, endDateTime, clientId }: Timeslot) => {
  const client = useFetchPerson('/clients', clientId);

  return (
    <ListItemButton>
      <ListItemText
        primary={`${getTimeslotString(
          startDateTime,
          endDateTime
        )} with client ${client?.name}`}
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
