import { List, ListItemButton, ListItemText, Typography } from '@mui/material';

import { Timeslot } from '../../../shared/types';
import { getTimeslotString } from '../../../shared/utils';

const AvailableTimeslots = ({
  timeslots,
}: {
  timeslots: Timeslot[] | undefined;
}) => {
  const freeTimeslots = timeslots?.filter(
    (timeslot: Timeslot) => timeslot.clientId === ''
  );

  if (!freeTimeslots?.length) return <Typography>No free timeslots</Typography>;

  const getAvailableTimeslots = () =>
    freeTimeslots.map((timeslot: Timeslot, i: number) => {
      const { startDateTime, endDateTime } = timeslot;
      return (
        <ListItemButton key={i}>
          <ListItemText
            primary={getTimeslotString(startDateTime, endDateTime)}
          />
        </ListItemButton>
      );
    });

  return <List>{getAvailableTimeslots()}</List>;
};

export default AvailableTimeslots;
